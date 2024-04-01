"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { ResponseData } from "@/types";
import { AttendanceTypeSchema } from "@/schemas";
import { Axios } from "@/action/axios";

export const getAllAttendanceType = async () => {
  try {
    const axiosResponse = await Axios.get(
      "/attendance-type/getAllAttendanceType"
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
export const createAttendanceType = async (
  value: z.infer<typeof AttendanceTypeSchema>
) => {
  try {
    const axiosResponse = await Axios.post("/attendance-type/create", value);
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
export const updateAttendanceType = async (value: any) => {
  try {
    const axiosResponse = await Axios.put("/attendance-type/update", value);
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
export const deleteAttendanceType = async (value: any) => {
  try {
    const axiosResponse = await Axios.delete(
      `/attendance-type/delete?id=${value}`,
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
