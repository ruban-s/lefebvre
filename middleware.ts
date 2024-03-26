import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";
import { GetServerSidePropsContext } from "next";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req?.auth;
  const { nextUrl, auth } = req!;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log(isLoggedIn);
  console.log(auth);
  console.log(nextUrl);

  //for a testing
  // if (nextUrl.pathname === "/") {
  //   return Response.redirect(new URL("/dashboard", nextUrl));
  // }
  if (isApiAuthRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (!isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
