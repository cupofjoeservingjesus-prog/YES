import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, userCredits, videos, payments, Video, UserCredit, Payment } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserCredits(userId: number): Promise<UserCredit | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(userCredits).where(eq(userCredits.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createUserCredits(userId: number): Promise<UserCredit> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(userCredits).values({ userId, videosRemaining: 3, plan: "free" });
  const result = await getUserCredits(userId);
  if (!result) throw new Error("Failed to create user credits");
  return result;
}

export async function deductVideoCredit(userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const credits = await getUserCredits(userId);
  if (!credits || credits.videosRemaining <= 0) return false;
  await db.update(userCredits).set({ videosRemaining: credits.videosRemaining - 1, lifetimeVideosUsed: credits.lifetimeVideosUsed + 1 }).where(eq(userCredits.userId, userId));
  return true;
}

export async function addVideoCredits(userId: number, amount: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const credits = await getUserCredits(userId);
  if (!credits) throw new Error("User credits not found");
  await db.update(userCredits).set({ videosRemaining: credits.videosRemaining + amount }).where(eq(userCredits.userId, userId));
}

export async function createVideo(data: { userId: number; title?: string; prompt?: string; type: "ai_generated" | "uploaded" }): Promise<Video> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(videos).values({ userId: data.userId, title: data.title, prompt: data.prompt, type: data.type, status: "processing" });
  const videoId = (result as any).insertId;
  const video = await db.select().from(videos).where(eq(videos.id, videoId)).limit(1);
  if (!video.length) throw new Error("Failed to create video");
  return video[0];
}

export async function getVideo(videoId: number): Promise<Video | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(videos).where(eq(videos.id, videoId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserVideos(userId: number, limit = 50): Promise<Video[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(videos).where(eq(videos.userId, userId)).orderBy(desc(videos.createdAt)).limit(limit);
}

export async function updateVideoStatus(videoId: number, status: "processing" | "completed" | "failed", data?: Partial<Video>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(videos).set({ status, ...data }).where(eq(videos.id, videoId));
}

export async function createPayment(data: { userId: number; stripePaymentId: string; amount: number; creditsAdded: number }): Promise<Payment> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(payments).values({ userId: data.userId, stripePaymentId: data.stripePaymentId, amount: data.amount, creditsAdded: data.creditsAdded, status: "pending" });
  const paymentId = (result as any).insertId;
  const payment = await db.select().from(payments).where(eq(payments.id, paymentId)).limit(1);
  if (!payment.length) throw new Error("Failed to create payment");
  return payment[0];
}

export async function completePayment(stripePaymentId: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(payments).set({ status: "completed" }).where(eq(payments.stripePaymentId, stripePaymentId));
}
