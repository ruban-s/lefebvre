"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { ResponseData } from "@/types";
import { EmployeeSchema } from "@/schemas";
import { Axios, DashboardAxios } from "@/action/axios";

export const getAllEmployee = async () => {
  try {
    const axiosResponse = await Axios.get("/employee/getAllEmployees");
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
export const createEmployee = async (value: z.infer<typeof EmployeeSchema>) => {
  try {
    const axiosResponse = await Axios.post("/employee/create", value);
    const data = axiosResponse.data;
    // console.log("json data", JSON.parse(data.data));
    // const microserviceData = JSON.parse(data.data);
    // const response = await DashboardAxios.post(
    //   "/dashboard/employee/create",
    //   microserviceData
    // );
    // console.log(response);
    // console.log(JSON.parse(data.data));
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
export const updateEmployee = async (value: any) => {
  try {
    const axiosResponse = await Axios.put("/employee/update", value);
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
export const deleteEmployee = async (value: any) => {
  try {
    const axiosResponse = await Axios.delete(
      `/employee/delete?id=${value}`,
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
