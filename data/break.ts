"use server";
import { BASE_URL } from "@/config/const";
import { ResponseData } from "@/types";

export const getAllBreaks = async () => {
  try {
    const response = await fetch(
      "http://208.109.9.243:8082/break/getAllBreaks",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData: ResponseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    const errorResponse: ResponseData = {
      status: false,
      message: JSON.stringify(error),
      data: "",
    };
    return errorResponse;
  }
};
