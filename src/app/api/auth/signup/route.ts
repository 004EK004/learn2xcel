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
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const signupAttempts = new Map<string, { count: number; windowStart: number }>();

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

function isRateLimited(request: Request) {
  const key = getClientKey(request);
  const now = Date.now();
  pruneRateLimitStore(now);
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

  if (!EMAIL_PATTERN.test(email)) {
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
