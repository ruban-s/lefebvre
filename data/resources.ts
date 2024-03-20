"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { BreaksData, ResponseData } from "@/types";
import axios from "axios";
import { ResourceSchema } from "@/schemas";

export const getAllResources = async () => {
  try {
    const axiosResponse = await axios.get(
      "http://208.109.9.243:8082/resourceAdmin/getAllResource"
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
    const axiosResponse = await axios.post(
      "http://208.109.9.243:8082/resourceAdmin/create",
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
    const axiosResponse = await axios.put(
      "http://208.109.9.243:8082/resourceAdmin/update",
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
