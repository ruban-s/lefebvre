"use server";
import * as z from "zod";
import { ShiftSchema } from "@/schemas/index";
import { BASE_URL } from "@/config/const";
import { ResponseData, ShiftData } from "@/types";
import { Axios } from "@/action/axios";

interface data {
  status: boolean;
  message: string;
  data: string;
}
export const getAllShift = async () => {
  try {
    const axiosResponse = await Axios.get("/shift/getAllShifts");
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
export const createShift = async (value: z.infer<typeof ShiftSchema>) => {
  try {
    const axiosResponse = await Axios.post("/shift/create", value);
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
export const updateShift = async (value: ShiftData) => {
  try {
    const axiosResponse = await Axios.put("/shift/update", value);
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

//
export const getShiftById = async (value: any) => {
  try {
    const axiosResponse = await Axios.get(
      BASE_URL + `/shift/getOneShift?Shift_id=${value}`,
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

export const deleteShift = async (value: any) => {
  try {
    const axiosResponse = await Axios.delete(
      `/shift/delete?id=${value}`,
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
