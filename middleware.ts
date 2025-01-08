import { NextRequest } from "next/server";
import { authRoutes, publicRoutes, Routes } from "./lib";

export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const isLoggedIn = request.cookies.get("kerUser");
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  /**
   * If user is logged in and is trying to access a public route, Redirect them to the /dashboard
   */
  if (isAuthRoute) {
    if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
    else return;
  }
  /**
   *  If user is not logged in and is trying to access a protected route, Redirect them to the /auth/login
   */
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
