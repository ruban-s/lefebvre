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
export const getAllLabourCard = async () => {
  try {
    const axiosResponse = await Axios.get("/labor/web/getAllLabor");
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
