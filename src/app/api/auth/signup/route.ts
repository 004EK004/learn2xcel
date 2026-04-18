import { Client, ID, Users } from "appwrite";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SignupBody = {
  email?: string;
  password?: string;
  name?: string;
};

const endpoint =
  process.env.APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId =
  process.env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

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

  let body: SignupBody;
  try {
    body = (await request.json()) as SignupBody;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const email = body.email?.trim();
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
    const user = await users.create(ID.unique(), email, undefined, password, name);
    return NextResponse.json(
      { id: user.$id, email: user.email },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unable to create account.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
