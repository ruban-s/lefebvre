"use server";

import { Axios } from "@/action/axios";
import { ResponseData } from "@/types";

interface getResourceReportWithFilterProps {
  project_id: string;
  resource_status: string;
  work_order_Id: string;
}

export const getResourceReportWithFilter = async ({
  project_id,
  resource_status,
  work_order_Id,
}: getResourceReportWithFilterProps) => {
  try {
    const AxiosResponse = await Axios.get(
      `/report/resourceSummeryReport?project_id=${project_id}&resource_status=${resource_status}&work_order_id=${work_order_Id}`
    );
    return AxiosResponse!.data;
  } catch (error) {
    const errorResponse: ResponseData = {
      status: false,
      message: JSON.stringify(error),
      data: "",
    };
    return errorResponse;
  }
};
