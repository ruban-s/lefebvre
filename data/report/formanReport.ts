"use server";
import { Axios } from "@/action/axios";
import { ResponseData, WorkOrderDataReport } from "@/types";

interface getFormanReportProps {
  forman_id: string;
  project_id: string;
  resource_status: string;
  work_order_id: string;
}

export const getFormanReport = async ({
  forman_id,
  project_id,
  resource_status,
  work_order_id,
}: getFormanReportProps) => {
  try {
    const AxiosResponse = await Axios.get(
      `/report/formanReport?forman_id=${forman_id}&project_id=${project_id}&resource_status=${resource_status}&work_order_id=${work_order_id}`
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
