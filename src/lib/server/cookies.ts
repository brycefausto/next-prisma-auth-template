"use server";

import { cookies } from "next/headers";

export const SESSION_COOKIE = "app_session";

export async function setSessionCookie(token: string, maxAge = 60 * 60 * 24) {
  (await cookies()).set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
    path: "/",
  });
}

export async function getSessionCookie() {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function clearSessionCookie() {
  (await cookies()).delete(SESSION_COOKIE);
}
