"use server";
import { Axios } from "@/action/axios";
import { ResponseData } from "@/types";
import { headers } from "next/headers";

export const uploadImage = async (formData: FormData, name: string) => {
  try {
    const axiosResponse = await Axios.post(
      `/uploadFile?fileName=${name}`,
      formData
    );

    const data = axiosResponse.data;
    return data;
  } catch (error) {
    const errorResponse: ResponseData = {
      status: false,
      message: JSON.stringify(error),
      data: "",
    };
    console.log(errorResponse);
    return errorResponse;
  }
};
