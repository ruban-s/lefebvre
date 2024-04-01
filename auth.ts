import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { cookies } from "next/headers";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session, user }) {
      if (session.user && token?.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token?.role) {
        session.user.role = token.role;
      }
      if (session.user && token?.token) {
        session.user.token = token.token;
      }
      return session;
    },
    async jwt({ token, user, profile }) {
      const newUser = user as any;
      if (!token.sub) return token;
      if (!newUser) return token;
      token.role = newUser?.role_name;
      cookies().set("token", newUser?.token, {
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
      });
      token.token = newUser?.token;
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
});
