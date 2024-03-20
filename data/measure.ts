"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { ResponseData } from "@/types";
import axios from "axios";
import { MeasureSchema } from "@/schemas";

export const getAllMeasure = async () => {
  try {
    const axiosResponse = await axios.get(
      "http://208.109.9.243:8082/unit_measure/getAllUnitMeasures"
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
export const createMeasure = async (value: z.infer<typeof MeasureSchema>) => {
  try {
    const axiosResponse = await axios.post(
      "http://208.109.9.243:8082/unit_measure/create",
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
export const updateMeasure = async (value: any) => {
  try {
    const axiosResponse = await axios.put(
      "http://208.109.9.243:8082/unit_measure/update",
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
