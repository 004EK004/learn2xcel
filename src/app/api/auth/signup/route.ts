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
const signupAttempts = new Map<string, { count: number; windowStart: number }>();

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) return "unknown";
  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(request: Request) {
  const key = getClientKey(request);
  const now = Date.now();
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

  let body: SignupBody;
  try {
    body = (await request.json()) as SignupBody;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password;
  const name = body.name?.trim();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
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
