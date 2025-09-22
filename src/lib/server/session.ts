"use server";

import { SignJWT, jwtVerify } from "jose";
import { SessionData } from "@/types";
import { setSessionCookie, getSessionCookie, clearSessionCookie } from "./cookies";

export const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET || "dev_secret_key");

export async function createSession(data: SessionData, expiresInSeconds = 60 * 60 * 24) {
  const token = await new SignJWT({ ...data })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresInSeconds)
    .sign(SECRET);

  setSessionCookie(token, expiresInSeconds);
  return token;
}

export async function verifySession(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as SessionData;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionData | null> {
  const token = await getSessionCookie();
  if (!token) return null;
  return verifySession(token);
}

export async function destroySession() {
  clearSessionCookie();
}
