import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  adminRoutes,
  plannerRoutes,
  publicRoutes,
} from "@/routes";
import { cookies } from "next/headers";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req?.auth;
  const { nextUrl, auth } = req!;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isPlannerRoute = plannerRoutes.includes(nextUrl.pathname);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const role = cookieStore.get("role");

  console.log(token);
  console.log(role);

  if (isApiAuthRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (!isLoggedIn || !token) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  if (isPublicRoutes) {
    return;
  }
  if (role?.value === "Admin") {
    if (!isAdminRoute) {
      return Response.redirect(new URL("/access-denied", nextUrl));
    }
    return;
  }
  if (role?.value === "Planner") {
    if (!isPlannerRoute) {
      return Response.redirect(new URL("/access-denied", nextUrl));
    }
    return;
  }
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
