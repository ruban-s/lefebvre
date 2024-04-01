"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { LoginSchema } from "@/schemas/index";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { Axios } from "./axios";

interface responseData {
  status: boolean;
  message: string;
  data: string;
}

export const Login = async (data: z.infer<typeof LoginSchema>) => {
  try {
    await signIn("credentials", {
      username: data.username,
      password: data.password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!", data: error.message };
      }
    }

    throw error;
  }
};
