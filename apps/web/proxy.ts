import { NextRequest, NextResponse } from "next/server";
import { Routes } from "@/shared/constants/routes";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/features/auth/model/authSession";

const PUBLIC_ROUTES = [Routes.Login as string];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifyAuthToken(
    request.cookies.get(AUTH_COOKIE_NAME)?.value,
  );
  const isAuthenticated = Boolean(session);

  if (pathname === Routes.Login && isAuthenticated) {
    return NextResponse.redirect(new URL(Routes.Root, request.url));
  }

  if (!PUBLIC_ROUTES.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
