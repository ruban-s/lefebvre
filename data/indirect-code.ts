"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { BreaksData, ResponseData } from "@/types";
import { IndirectCodeSchema } from "@/schemas";
import { Axios } from "@/action/axios";

export const getAllIndirectCodes = async () => {
  try {
    const axiosResponse = await Axios.get("/indirectcode/getAllIndirectCodes");
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
    const axiosResponse = await Axios.post("/indirectcode/create", value);
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
    const axiosResponse = await Axios.put("/indirectcode/update", value);
    const data = axiosResponse.data;
    // console.log(data);

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
export const deleteIndirectCode = async (value: any) => {
  try {
    const axiosResponse = await Axios.delete(
      `/indirectcode/delete?id=${value}`,
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
