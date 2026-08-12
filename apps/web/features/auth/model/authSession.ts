import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "wf_auth_token";

export interface AuthSessionPayload {
  sub: string;
  email: string;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyAuthToken(
  token?: string,
): Promise<AuthSessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<AuthSessionPayload>(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function getAuthSession(): Promise<AuthSessionPayload | null> {
  const store = await cookies();
  return verifyAuthToken(store.get(AUTH_COOKIE_NAME)?.value);
}
