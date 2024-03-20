"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { BreaksData, ResponseData } from "@/types";
import axios from "axios";
import { IndirectCodeSchema } from "@/schemas";

export const getAllIndirectCodes = async () => {
  try {
    const axiosResponse = await axios.get(
      "http://208.109.9.243:8082/indirectcode/getAllIndirectCodes"
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
export const createIndirectCode = async (
  value: z.infer<typeof IndirectCodeSchema>
) => {
  try {
    const axiosResponse = await axios.post(
      "http://208.109.9.243:8082/indirectcode/create",
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
export const updateIndirectCode = async (value: any) => {
  try {
    const axiosResponse = await axios.put(
      "http://208.109.9.243:8082/indirectcode/update",
      value
    );
    const data = axiosResponse.data;
    console.log(data);

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
