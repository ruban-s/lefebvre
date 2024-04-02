"use server";
import * as z from "zod";
import { ResourceWorkOrderSchema } from "@/schemas/index";
import { BASE_URL } from "@/config/const";
import { ResponseData, WorkOrderData } from "@/types";
import { Axios } from "@/action/axios";

interface data {
  status: boolean;
  message: string;
  data: string;
}
export const getAllResourceWorkOrder = async () => {
  try {
    const axiosResponse = await Axios.get("/resource/getAllResource");
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
export const getAllResourceWorkOrderByStatus = async (value: string) => {
  try {
    const axiosResponse = await Axios.get(
      `/resource/getResourceByStatus?Resource_status=${value}`
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
export const createResourceWorkOrder = async (
  value: z.infer<typeof ResourceWorkOrderSchema>[]
) => {
  try {
    const axiosResponse = await Axios.post("/resource/multiple-create", value);
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
export const updateResourceWorkOrder = async (value: WorkOrderData) => {
  try {
    const axiosResponse = await Axios.put("/resource/update", value);
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

export const deleteResourceWorkOrder = async (value: any) => {
  try {
    const axiosResponse = await Axios.delete(
      `/resource//delete?id=${value}`,
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
