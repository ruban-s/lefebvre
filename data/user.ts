"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas/index";
import { BASE_URL } from "@/config/const";

interface data {
  status: boolean;
  message: string;
  data: string;
}

export const getUserById = async (userId: string) => {
  try {
    const response = await fetch(
      BASE_URL + `/user/getOneUser?user_id=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData: data = await response.json();
    return responseData;
  } catch (error) {
    const errorResponse: data = {
      status: false,
      message: JSON.stringify(error),
      data: "",
    };
    return errorResponse;
  }
};
