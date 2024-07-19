"use server";

import { Axios } from "@/action/axios";
import { ResponseData } from "@/types";

export const getIndirectReport = async (fromDate: string, toDate: string) => {
  try {
    var start = fromDate.split("-");
    var end = toDate.split("-");
    const AxiosResponse = await Axios.get("/report/indirectReport", {
      params: {
        from_date: `${start[2]}-${start[1]}-${start[0]}`,
        to_date: `${end[2]}-${end[1]}-${end[0]}`,
      },
    });
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
