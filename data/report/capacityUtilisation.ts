"use server";
import { Axios } from "@/action/axios";
import { ResponseData } from "@/types";

export const getCapacityUtilisation = async () => {
  try {
    const AxiosResponse = await Axios.get("/report/capacityUtilisation");
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
