"use server";
import * as z from "zod";
import { WorkOrderSchema } from "@/schemas/index";
import { BASE_URL } from "@/config/const";
import axios from "axios";
import { ResponseData, WorkOrderData } from "@/types";

interface data {
  status: boolean;
  message: string;
  data: string;
}
export const getAllWorkOrder = async () => {
  try {
    const axiosResponse = await axios.get(
      "http://208.109.9.243:8082/workorder/getAllWorkOrder"
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
export const createWorkOrder = async (
  value: z.infer<typeof WorkOrderSchema>
) => {
  try {
    const axiosResponse = await axios.post(
      "http://208.109.9.243:8082/workorder/create",
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
export const updateWorkOrder = async (value: WorkOrderData) => {
  try {
    const axiosResponse = await axios.put(
      "http://208.109.9.243:8082/workorder/update",
      value
    );
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

export const deleteWorkOrder = async (value: any) => {
  try {
    const axiosResponse = await axios.delete(
      `http://208.109.9.243:8082/workorder/delete?id=${value}`,
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
