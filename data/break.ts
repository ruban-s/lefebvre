"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { BreaksData, ResponseData } from "@/types";
import axios from "axios";
import { BreakSchema } from "@/schemas";
import { Axios } from "@/action/axios";

export const getAllBreaks = async () => {
  try {
    const axiosResponse = await Axios.get("/break/getAllBreaks");
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
export const createBreak = async (value: z.infer<typeof BreakSchema>) => {
  try {
    const axiosResponse = await Axios.post("/break/create", value);
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
export const updateBreak = async (value: BreaksData) => {
  try {
    const axiosResponse = await Axios.put("/break/update", value);
    const data = axiosResponse.data;
    return data;
  } catch (error) {
    // console.log(error);
    const errorResponse: ResponseData = {
      status: false,
      message: JSON.stringify(error),
      data: "",
    };
    return errorResponse;
  }
};
export const deleteBreak = async (value: any) => {
  try {
    const axiosResponse = await Axios.delete(
      `/break/delete?id=${value}`,
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
