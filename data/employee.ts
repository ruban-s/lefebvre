"use server";
import * as z from "zod";
import { BASE_URL } from "@/config/const";
import { ResponseData } from "@/types";
import axios from "axios";
import { EmployeeSchema } from "@/schemas";

export const getAllEmployee = async () => {
  try {
    const axiosResponse = await axios.get(
      "http://208.109.9.243:8082/employee/getAllEmployees"
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
export const createEmployee = async (value: z.infer<typeof EmployeeSchema>) => {
  try {
    const axiosResponse = await axios.post(
      "http://208.109.9.243:8082/employee/create",
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
export const updateEmployee = async (value: any) => {
  try {
    const axiosResponse = await axios.put(
      "http://208.109.9.243:8082/employee/update",
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
export const deleteEmployee = async (value: any) => {
  try {
    const axiosResponse = await axios.delete(
      `http://208.109.9.243:8082/employee/delete?id=${value}`,
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
