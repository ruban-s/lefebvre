"use server";
import { LoginSchema } from "@/schemas/index";

interface data {
  status: boolean;
  message: string;
  data: string;
}
interface loginData {
  username: string;
  password: string;
}

export const getUserById = async (data: loginData) => {
  try {
    const response = await fetch("http://208.109.9.243:8082/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
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
