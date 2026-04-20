import {
  Account,
  Client,
  Databases,
  ID,
  OAuthProvider,
  Query,
  type Models,
} from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const usersCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;
const enrollmentsCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID;

export const client = new Client();

export const appwriteReady = Boolean(endpoint && projectId);
export const appwriteConfigError =
  "Appwrite is not configured. Set NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID in .env.local.";

if (appwriteReady) {
  client.setEndpoint(endpoint as string).setProject(projectId as string);
}

export const account = new Account(client);
export const databases = new Databases(client);

function ensureAppwriteConfigured() {
  if (!appwriteReady) {
    throw new Error(appwriteConfigError);
  }
}

type SignupErrorResponse = {
  error?: string;
  message?: string;
};

async function parseSignupError(
  response: Response
): Promise<SignupErrorResponse | null> {
  try {
    return (await response.json()) as SignupErrorResponse;
  } catch (error) {
    console.warn("Unable to parse signup error response payload", error);
    return null;
  }
}

export async function register(
  email: string,
  password: string,
  name?: string
) {
  ensureAppwriteConfigured();

  if (typeof window !== "undefined") {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        return response.json();
      }

      const payload = await parseSignupError(response);

      if (payload?.error === "server_signup_not_configured") {
        return account.create(ID.unique(), email, password, name);
      } else {
        throw new Error(payload?.message || "Unable to create account.");
      }
    } catch (error) {
      if (error instanceof TypeError) {
        console.error(
          `Server signup request failed (${error.message}), using client-side account creation as fallback`,
          error
        );
        return account.create(ID.unique(), email, password, name);
      } else {
        throw error;
      }
    }
  }

  return account.create(ID.unique(), email, password, name);
}

export async function login(email: string, password: string) {
  ensureAppwriteConfigured();
  return account.createEmailPasswordSession(email, password);
}

export async function loginWithProvider(provider: "google" | "github") {
  ensureAppwriteConfigured();
  if (typeof window === "undefined") return null;

  const success = `${window.location.origin}/dashboard`;
  const failure = `${window.location.origin}/auth?error=oauth`;
  return account.createOAuth2Session(
    provider === "google" ? OAuthProvider.Google : OAuthProvider.Github,
    success,
    failure
  );
}

export async function getCurrentUser() {
  if (!appwriteReady) return null;
  try {
    return await account.get();
  } catch (error) {
    console.error("Appwrite get current user failed", error);
    return null;
  }
}

export async function logout() {
  if (!appwriteReady) return null;
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Appwrite logout failed", error);
    return false;
  }
}

type EnrollmentPayload = {
  email: string;
  trackId: string;
  cohortId?: string;
  paymentStatus?: string;
};

export async function createEnrollment(payload: EnrollmentPayload) {
  if (!appwriteReady || !databaseId || !enrollmentsCollectionId) {
    console.warn(appwriteConfigError);
    return { success: false, message: appwriteConfigError };
  }
  try {
    const doc = await databases.createDocument(
      databaseId,
      enrollmentsCollectionId,
      ID.unique(),
      payload
    );
    return { success: true, document: doc };
  } catch (error) {
    console.error("Appwrite enrollment failed", error);
    return { success: false, message: "Unable to create enrollment" };
  }
}

type ProgressPayload = {
  trackId: string;
  userId: string;
  completedLessons: string[];
  certificateUrl?: string;
};

export async function saveProgress(payload: ProgressPayload) {
  if (!appwriteReady || !databaseId || !usersCollectionId) {
    console.warn(appwriteConfigError);
    return { success: false, message: appwriteConfigError };
  }
  try {
    const doc = await databases.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),
      payload
    );
    return { success: true, document: doc };
  } catch (error) {
    console.error("Appwrite save progress failed", error);
    return { success: false, message: "Unable to save progress" };
  }
}

export async function getUserProgress(userId: string) {
  if (!appwriteReady || !databaseId || !usersCollectionId) {
    console.warn(appwriteConfigError);
    return [] as Models.Document[];
  }
  try {
    const response = await databases.listDocuments(databaseId, usersCollectionId, [
      Query.equal("userId", userId),
    ]);
    return response.documents;
  } catch (error) {
    console.error("Appwrite fetch progress failed", error);
    return [];
  }
}

export async function saveLead(payload: { email: string; message?: string }) {
  if (!appwriteReady || !databaseId || !enrollmentsCollectionId) {
    console.warn(appwriteConfigError);
    return { success: false, message: appwriteConfigError };
  }
  try {
    const doc = await databases.createDocument(
      databaseId,
      enrollmentsCollectionId,
      ID.unique(),
      { ...payload, trackId: "waitlist" }
    );
    return { success: true, document: doc };
  } catch (error) {
    console.error("Appwrite lead capture failed", error);
    return { success: false, message: "Unable to save lead" };
  }
}
