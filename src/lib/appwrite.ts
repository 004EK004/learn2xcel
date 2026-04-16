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

const client = new Client();

if (endpoint && projectId) {
  client.setEndpoint(endpoint).setProject(projectId);
}

const account = endpoint && projectId ? new Account(client) : null;
const databases = endpoint && projectId ? new Databases(client) : null;

export const appwriteReady = Boolean(endpoint && projectId);

const notConfiguredMessage =
  "Appwrite is not configured yet. Add env variables to enable live data.";

export async function register(
  email: string,
  password: string,
  name?: string
) {
  if (!account) {
    console.warn(notConfiguredMessage);
    return null;
  }

  return account.create(ID.unique(), email, password, name);
}

export async function login(email: string, password: string) {
  if (!account) {
    console.warn(notConfiguredMessage);
    return null;
  }
  return account.createEmailPasswordSession(email, password);
}

export async function loginWithProvider(provider: "google" | "github") {
  if (!account) {
    console.warn(notConfiguredMessage);
    return null;
  }
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
  if (!account) {
    console.warn(notConfiguredMessage);
    return null;
  }
  try {
    return await account.get();
  } catch (error) {
    console.error("Appwrite get current user failed", error);
    return null;
  }
}

export async function logout() {
  if (!account) {
    console.warn(notConfiguredMessage);
    return null;
  }
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
  if (!databases || !databaseId || !enrollmentsCollectionId) {
    console.warn(notConfiguredMessage);
    return { success: false, message: notConfiguredMessage };
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
  if (!databases || !databaseId || !usersCollectionId) {
    console.warn(notConfiguredMessage);
    return { success: false, message: notConfiguredMessage };
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
  if (!databases || !databaseId || !usersCollectionId) {
    console.warn(notConfiguredMessage);
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
  if (!databases || !databaseId || !enrollmentsCollectionId) {
    console.warn(notConfiguredMessage);
    return { success: false, message: notConfiguredMessage };
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
