import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { Login } from "./action/login";

export default {
  trustHost: true,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const authResponse = await fetch(
            "http://194.62.96.140:8082/user/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );
          if (!authResponse.ok) {
            return null;
          }
          const response = await authResponse.json();
          console.log(response);
          if (response.status) {
            const user = JSON.parse(response.data);
            user["token"] = response.authToken;
            console.log(user);
            return Promise.resolve(user);
          }
          return null;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
