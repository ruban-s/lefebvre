"use server";
import * as z from "zod";
import { ProjectSchema } from "@/schemas/index";
import { BASE_URL } from "@/config/const";
import { ResponseData, ProjectData } from "@/types";
import { Axios } from "@/action/axios";

interface data {
  status: boolean;
  message: string;
  data: string;
}
export const getAllProject = async () => {
  try {
    const axiosResponse = await Axios.get("/project/getAllProject");
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
export const getAllProject2 = async (name: string, file: File) => {
  console.log(name);
  try {
    const axiosResponse = await Axios.get("/project/getAllProject");
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
export const getAllProjectByStatus = async (value: string) => {
  try {
    const axiosResponse = await Axios.get(
      `/project/getProjectByStatus?project_status=${value}`
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
export const createProject = async (value: z.infer<typeof ProjectSchema>) => {
  try {
    const axiosResponse = await Axios.post("/project/create", value);
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
export const updateProject = async (value: ProjectData) => {
  try {
    const axiosResponse = await Axios.put("/project/update", value);
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

export const deleteProject = async (value: any) => {
  try {
    const axiosResponse = await Axios.delete(
      `/project/delete?id=${value}`,
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
