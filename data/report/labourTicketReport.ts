"use server";

import { Axios } from "@/action/axios";
import { ResponseData } from "@/types";

export const getLabourTicketReport = async (
  fromDate: string,
  toDate: string
) => {
  try {
    const AxiosResponse = await Axios.get(
      `/report/labourTicketReport?from_date=${fromDate}&to_date=${toDate}`
    );
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
