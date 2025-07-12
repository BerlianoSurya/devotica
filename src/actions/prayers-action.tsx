"use server";
import { and, eq, not } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { prayers, user, userPrayerLogs } from "@/db/schema";
import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { auth } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";
import { memoize } from "nextjs-better-unstable-cache";
import { revalidateTag } from "next/cache";
import { UserPrayerLog } from "@/components/calendar/types";
import { getRateLimitKey } from "@/lib/utils";
import { NextResponse } from "next/server";

interface GetUserPrayerLogParams {
  userId: string;
  ip: string;
}
const ratelimitAmountConvert = (key: string, fallback: number) =>
  Number(process.env[key]) || fallback;
const WRITE_COUNT = ratelimitAmountConvert("RATE_LIMIT_WRITE_COUNT", 5);
const WRITE_WINDOW = ratelimitAmountConvert("RATE_LIMIT_WRITE_WINDOW", 86400);
const READ_COUNT = ratelimitAmountConvert("RATE_LIMIT_READ_COUNT", 30);
const READ_WINDOW = ratelimitAmountConvert("RATE_LIMIT_READ_WINDOW", 3600);
const ENABLE_RATE_LIMITING = process.env.ENABLE_RATE_LIMITING === "true";

const writeRateLimit = ENABLE_RATE_LIMITING
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(WRITE_COUNT, `${WRITE_WINDOW}s`),
      prefix: "@upstash/ratelimit:write",
    })
  : null;

const readRateLimit = ENABLE_RATE_LIMITING
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(READ_COUNT, `${READ_WINDOW}s`),
      prefix: "@upstash/ratelimit:read",
    })
  : null;

export async function trackUserPrayer(prayer: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect("/login");
  }

  if (writeRateLimit) {
    const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
    const key = getRateLimitKey(session.user.id, ip);
    const { remaining } = await writeRateLimit.limit(key);

    if (remaining === 0) {
      return {
        success: false,
        error: "Rate limit exceeded",
        message: "You can only submit five requests per day.",
      };
    }
  }

  try {
    const result = await db
      .insert(userPrayerLogs)
      .values({
        id: uuidv4(),
        userId: session.user.id,
        prayerId: prayer,
        prayedAt: new Date(),
      })
      .returning();
    revalidateTag("userPrayerLog");

    return {
      success: true,
      message: "Prayer tracked successfully",
      newTrackedPrayer: result[0],
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Database error",
      message: "Failed to track prayer",
    };
  }
}
export async function trackUserPrayerManually(date: string, prayer: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("You are not authenticated!");
  }

  if (writeRateLimit) {
    const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
    const key = getRateLimitKey(session.user.id, ip);
    const { remaining } = await writeRateLimit.limit(key);

    if (remaining === 0) {
      return {
        success: false,
        error: "Rate limit exceeded",
        message: "You can only submit five requests per minute.",
      };
    }
  }

  try {
    const result = await db
      .insert(userPrayerLogs)
      .values({
        id: uuidv4(),
        userId: session.user.id,
        prayerId: prayer,
        prayedAt: date,
      })
      .returning();
    revalidateTag("userPrayerLog");

    return {
      success: true,
      message: "Prayer tracked successfully",
      newTrackedPrayer: result[0],
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Database error",
      message: "Failed to track prayer",
    };
  }
}

export const getUserPrayerLog = memoize(
  async ({ userId, ip }: GetUserPrayerLogParams) => {
    if (readRateLimit) {
      const key = getRateLimitKey(userId, ip);
      const { remaining } = await readRateLimit.limit(key);
      if (remaining === 0) {
        return {
          success: false,
          error: "Rate limit exceeded",
          message: "You can only submit five requests per minute.",
          logs: [],
        };
      }
    }

    try {
      const logs = await db
        .select({
          id: userPrayerLogs.id,
          userId: userPrayerLogs.userId,
          prayerId: userPrayerLogs.prayerId,
          prayedAt: userPrayerLogs.prayedAt,
          prayerTitle: prayers.title,
        })
        .from(userPrayerLogs)
        .where(eq(userPrayerLogs.userId, userId))
        .leftJoin(prayers, eq(userPrayerLogs.prayerId, prayers.id))
        .orderBy(userPrayerLogs.prayedAt);
      return {
        success: true,
        error: "",
        message: "Prayer logs fetched",
        logs: logs,
      };
    } catch (error) {
      console.error(error);
      return {
        error: "Database error",
        message: "Failed to fetch prayer logs",
        logs: [],
      };
    }
  },
  {
    persist: true,
    revalidateTags: () => ["userPrayerLog"],
    suppressWarnings: true,
    log: ["datacache", "verbose"],
    logid: "userPrayerLog",
  }
);
export async function fetchUserPrayerLogWrapper(): Promise<{
  success?: boolean;
  error?: string;
  message?: string;
  logs: UserPrayerLog[];
}> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "unauthorized",
        message: "You are not authenticated!",
        logs: [],
      };
    }

    const ip = (await headers()).get("x-forwarded-for") ?? "unknown";

    const result = await getUserPrayerLog({
      userId: session.user.id,
      ip,
    });

    return {
      ...result,
      logs: result.logs as UserPrayerLog[],
    };
  } catch (error) {
    console.error("Error in fetchUserPrayerLogWrapper:", error);
    return {
      success: false,
      error: "Internal Server Error",
      message: "Something went wrong while fetching prayer logs.",
      logs: [],
    };
  }
}

export async function removeUserPrayerLog(prayerLogId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("You are not authenticated!");
  }

  try {
    const result = await db
      .delete(userPrayerLogs)
      .where(
        and(
          eq(userPrayerLogs.id, prayerLogId),
          eq(userPrayerLogs.userId, session.user.id)
        )
      );

    if (result.rowCount >= 1) {
      revalidateTag("userPrayerLog");
    }

    return {
      success: true,
      message: "Prayer log deleted.",
      deletedCount: result.rowCount,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Database error",
      message: "Failed to remove prayer log",
    };
  }
}
