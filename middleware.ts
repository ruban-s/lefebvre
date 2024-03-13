import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl, auth } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
