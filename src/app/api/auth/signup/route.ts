import { Client, ID, Users } from "node-appwrite";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SignupBody = {
  email?: string;
  password?: string;
  name?: string;
};

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const SIGNUP_WINDOW_MS = 60_000;
const SIGNUP_MAX_ATTEMPTS = 10;
const MAX_BODY_BYTES = 8_192;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const NAME_MAX_LENGTH = 80;
const MAX_TRACKED_CLIENTS = 10_000;
const PRUNE_INTERVAL_MS = 60_000;
const signupAttempts = new Map<string, { count: number; windowStart: number }>();
let lastPruneAt = 0;

function getClientKey(request: Request) {
  const directIp =
    request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip");
  if (directIp) {
    return directIp.trim();
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const clientIp = forwardedFor.split(",")[0]?.trim();
    if (clientIp) {
      return clientIp;
    }
  }

  const userAgent = request.headers.get("user-agent")?.trim();
  return userAgent ? `ua:${userAgent}` : "unknown";
}

function pruneRateLimitStore(now: number) {
  for (const [key, entry] of signupAttempts) {
    if (now - entry.windowStart >= SIGNUP_WINDOW_MS) {
      signupAttempts.delete(key);
    }
  }
}

function isAlphaNumeric(charCode: number) {
  return (
    (charCode >= 48 && charCode <= 57) ||
    (charCode >= 65 && charCode <= 90) ||
    (charCode >= 97 && charCode <= 122)
  );
}

function hasOnlyEmailLocalChars(value: string) {
  for (let i = 0; i < value.length; i += 1) {
    const charCode = value.charCodeAt(i);
    const isAllowedSymbol =
      charCode === 46 || // .
      charCode === 95 || // _
      charCode === 37 || // %
      charCode === 43 || // +
      charCode === 45; // -
    if (!isAlphaNumeric(charCode) && !isAllowedSymbol) {
      return false;
    }
  }
  return true;
}

function hasOnlyEmailDomainChars(value: string) {
  for (let i = 0; i < value.length; i += 1) {
    const charCode = value.charCodeAt(i);
    const isAllowedSymbol = charCode === 46 || charCode === 45; // . or -
    if (!isAlphaNumeric(charCode) && !isAllowedSymbol) {
      return false;
    }
  }
  return true;
}

function isValidEmail(email: string) {
  if (email.length < 3 || email.length > 254) {
    return false;
  }

  const atIndex = email.indexOf("@");
  if (atIndex <= 0 || atIndex !== email.lastIndexOf("@") || atIndex >= email.length - 1) {
    return false;
  }

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  if (
    local.length === 0 ||
    local.length > 64 ||
    domain.length < 3 ||
    domain.startsWith(".") ||
    domain.endsWith(".") ||
    domain.includes("..")
  ) {
    return false;
  }

  const lastDotIndex = domain.lastIndexOf(".");
  if (lastDotIndex <= 0 || lastDotIndex === domain.length - 1) {
    return false;
  }

  const tld = domain.slice(lastDotIndex + 1);
  if (tld.length < 2) {
    return false;
  }

  return hasOnlyEmailLocalChars(local) && hasOnlyEmailDomainChars(domain);
}

function isRateLimited(request: Request) {
  const key = getClientKey(request);
  const now = Date.now();
  if (signupAttempts.size > MAX_TRACKED_CLIENTS || now - lastPruneAt >= PRUNE_INTERVAL_MS) {
    pruneRateLimitStore(now);
    lastPruneAt = now;
  }
  const entry = signupAttempts.get(key);

  if (!entry || now - entry.windowStart >= SIGNUP_WINDOW_MS) {
    signupAttempts.set(key, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= SIGNUP_MAX_ATTEMPTS) {
    return true;
  }

  entry.count += 1;
  signupAttempts.set(key, entry);
  return false;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!endpoint || !projectId || !apiKey) {
    return NextResponse.json(
      {
        error: "server_signup_not_configured",
        message:
          "Server signup is not configured. Add APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, and APPWRITE_API_KEY.",
      },
      { status: 503 }
    );
  }

  if (!isSameOrigin(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  if (isRateLimited(request)) {
    return NextResponse.json(
      { message: "Too many signup attempts. Please try again shortly." },
      { status: 429 }
    );
  }

  const contentType = request.headers.get("content-type");
  if (!contentType?.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { message: "Unsupported content type." },
      { status: 415 }
    );
  }

  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);
    if (!Number.isFinite(contentLength) || contentLength < 0) {
      return NextResponse.json(
        { message: "Invalid content length." },
        { status: 400 }
      );
    }

    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { message: "Request payload too large." },
        { status: 413 }
      );
    }
  }

  let body: SignupBody;
  try {
    body = (await request.json()) as SignupBody;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const email = body.email?.trim()?.toLowerCase();
  const password = body.password;
  const name = body.name?.trim();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
  }

  if (
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > PASSWORD_MAX_LENGTH
  ) {
    return NextResponse.json(
      {
        message: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`,
      },
      { status: 400 }
    );
  }

  if (name && name.length > NAME_MAX_LENGTH) {
    return NextResponse.json(
      { message: `Name must be ${NAME_MAX_LENGTH} characters or fewer.` },
      { status: 400 }
    );
  }

  const client = new Client();
  client.setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  const users = new Users(client);

  try {
    const user = await users.create(
      ID.unique(),
      email,
      undefined, // phone parameter omitted (email/password auth only)
      password,
      name
    );
    return NextResponse.json(
      { id: user.$id, email: user.email },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message.toLowerCase() : "";
    if (errorMessage.includes("already exists")) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "Unable to create account." }, { status: 400 });
  }
}
