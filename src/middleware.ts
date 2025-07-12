import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const authRoutes = ["/login", "/signup"];
const protectedRoutes = [
  "/dashboard",
  "/dashboard/prayers",
  "/dashboard/profile",
];
const alwaysAllowedRoutes = ["/"];

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request);
  const pathName = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathName);

  const isAuthRoute = authRoutes.includes(pathName);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathName.startsWith(route)
  );
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
