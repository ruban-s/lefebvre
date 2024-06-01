"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { BreaksData, ResponseData } from "@/types";
import { ResourceSchema } from "@/schemas";
import { Axios } from "@/action/axios";

export const getAllResources = async () => {
  try {
    const axiosResponse = await Axios.get(
      "http://194.62.96.140:8082/resourceAdmin/getAllResource"
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
export const createResources = async (
  value: z.infer<typeof ResourceSchema>
) => {
  try {
    const axiosResponse = await Axios.post(
      "http://194.62.96.140:8082/resourceAdmin/create",
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
export const updateResources = async (value: any) => {
  try {
    const axiosResponse = await Axios.put(
      "http://194.62.96.140:8082/resourceAdmin/update",
      value
    );
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
export const deleteResource = async (value: any) => {
  try {
    const axiosResponse = await Axios.delete(
      `http://194.62.96.140:8082/resourceAdmin/delete?id=${value}`,
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
