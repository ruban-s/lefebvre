"use server";
import * as z from "zod";
import { WorkOrderSchema } from "@/schemas/index";
import { BASE_URL } from "@/config/const";
import { ResponseData, WorkOrderData } from "@/types";
import { Axios } from "@/action/axios";

interface data {
  status: boolean;
  message: string;
  data: string;
}
export const getAllWorkOrder = async () => {
  try {
    const axiosResponse = await Axios.get(`/workorder/getAllWorkOrder`);
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
export const getAllWorkOrderByStatus = async (value: string) => {
  try {
    const axiosResponse = await Axios.get(
      `/workorder/getWorkOrderByStatus?work_order_status=${value}`
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
    const axiosResponse = await Axios.post("/workorder/create", value);
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
export const updateWorkOrder = async (value: any) => {
  try {
    const axiosResponse = await Axios.put("/workorder/update", value);
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
    const axiosResponse = await Axios.delete(
      `/workorder/delete?id=${value}`,
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

export const getAllWorkOrderByProjectId = async (projectId: any) => {
  try {
    const axiosResponse = await Axios.get(
      `/workorder/getWorkOrderByProjectId?project_id=${projectId}`
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
