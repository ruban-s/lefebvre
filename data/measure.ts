"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { ResponseData } from "@/types";
import { MeasureSchema } from "@/schemas";
import { Axios } from "@/action/axios";

export const getAllMeasure = async () => {
  try {
    const axiosResponse = await Axios.get("/unit_measure/getAllUnitMeasures");
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
    const axiosResponse = await Axios.post("/unit_measure/create", value);
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
export const updateMeasure = async (value: any) => {
  try {
    const axiosResponse = await Axios.put("/unit_measure/update", value);
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
export const deleteMeasure = async (value: any) => {
  try {
    const axiosResponse = await Axios.delete(
      `/unit_measure/delete?id=${value}`,
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
