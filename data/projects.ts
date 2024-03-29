"use server";
import * as z from "zod";
import { ProjectSchema } from "@/schemas/index";
import { BASE_URL } from "@/config/const";
import axios from "axios";
import { ResponseData, ProjectData } from "@/types";

interface data {
  status: boolean;
  message: string;
  data: string;
}
export const getAllProject = async () => {
  try {
    const axiosResponse = await axios.get(
      "http://208.109.9.243:8082/project/getAllProject"
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
export const createProject = async (value: z.infer<typeof ProjectSchema>) => {
  try {
    const axiosResponse = await axios.post(
      "http://208.109.9.243:8082/project/create",
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
export const updateProject = async (value: ProjectData) => {
  try {
    const axiosResponse = await axios.put(
      "http://208.109.9.243:8082/project/update",
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

export const deleteProject = async (value: any) => {
  try {
    const axiosResponse = await axios.delete(
      `http://208.109.9.243:8082/project/delete?id=${value}`,
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
