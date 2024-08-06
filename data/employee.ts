"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { ResponseData } from "@/types";
import { EmployeeSchema } from "@/schemas";
import { Axios, DashboardAxios } from "@/action/axios";
import { getAllShift } from "./shift";

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
    const microserviceData = JSON.parse(data.data);
    const response = await DashboardAxios.post("/dashboard/employee/create", {
      ...microserviceData,
      shift_type: value.shift_type,
    });
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
    const microserviceData = JSON.parse(data.data);
    const response = await DashboardAxios.put("/dashboard/employee/update", {
      ...microserviceData,
      shift_type: value.shift_type,
    });
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
    // console.log(value);
    const axiosResponse = await Axios.delete(
      `/employee/delete?id=${value.id}`,
      value.id
    );
    const data = axiosResponse.data;
    // console.log(data);
    const microServiceResponse = await DashboardAxios.delete(
      `/dashboard/employee/delete`,
      {
        data: { employee_id: value.employee_id }, // Send the employee_id in the request body
      }
    );
    return data;
    return {};
  } catch (error) {
    const errorResponse: ResponseData = {
      status: false,
      message: JSON.stringify(error),
      data: "",
    };
    return errorResponse;
  }
};
