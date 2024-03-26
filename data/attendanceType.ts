"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { ResponseData } from "@/types";
import axios from "axios";
import { AttendanceTypeSchema } from "@/schemas";

export const getAllAttendanceType = async () => {
  try {
    const axiosResponse = await axios.get(
      "http://208.109.9.243:8082/attendance-type/getAllAttendanceType"
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
    const axiosResponse = await axios.post(
      "http://208.109.9.243:8082/attendance-type/create",
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
export const updateAttendanceType = async (value: any) => {
  try {
    const axiosResponse = await axios.put(
      "http://208.109.9.243:8082/attendance-type/update",
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
export const deleteAttendanceType = async (value: any) => {
  try {
    const axiosResponse = await axios.delete(
      `http://208.109.9.243:8082/attendance-type/delete?id=${value}`,
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
