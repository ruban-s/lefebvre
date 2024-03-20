"use server";
import * as z from "zod";
import { UserSchema } from "@/schemas/index";
import { BASE_URL } from "@/config/const";
import axios from "axios";
import { ResponseData, UserData } from "@/types";

interface data {
  status: boolean;
  message: string;
  data: string;
}
export const getAllUser = async () => {
  try {
    const axiosResponse = await axios.get(
      "http://208.109.9.243:8082/user/getAllUsers"
    );
    const data = axiosResponse.data;
    return data;
  } catch (error) {
    const errorResponse: ResponseData = {
      status: false,
      message: JSON.stringify(error),
      data: "",
    };
    return errorResponse;
  }
};
export const createUser = async (value: z.infer<typeof UserSchema>) => {
  try {
    const axiosResponse = await axios.post(
      "http://208.109.9.243:8082/user/create",
      value
    );
    const data = axiosResponse.data;
    return data;
  } catch (error) {
    const errorResponse: ResponseData = {
      status: false,
      message: JSON.stringify(error),
      data: "",
    };
    return errorResponse;
  }
};
export const updateUser = async (value: UserData) => {
  try {
    const axiosResponse = await axios.put(
      "http://208.109.9.243:8082/user/update",
      value
    );
    const data = axiosResponse.data;
    return data;
  } catch (error) {
    console.log(error);
    const errorResponse: ResponseData = {
      status: false,
      message: JSON.stringify(error),
      data: "",
    };
    return errorResponse;
  }
};

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
