"use server";
import { Axios } from "@/action/axios";
import { ResponseData } from "@/types";

export const getEmployeeEfficiency = async () => {
  try {
    const AxiosResponse = await Axios.get("/report/employeeEfficiency");
    return AxiosResponse.data;
  } catch (error) {
    const errorResponse: ResponseData = {
      status: false,
      message: JSON.stringify(error),
      data: "",
    };
    return errorResponse;
  }
};
