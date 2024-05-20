"use server";
import { Axios } from "@/action/axios";
import { ResponseData, WorkOrderDataReport } from "@/types";

interface getWorkOrderReportProps {
  status: string;
  project_id: string;
}

export const getWorkOrderReport = async ({
  status,
  project_id,
}: getWorkOrderReportProps) => {
  try {
    const AxiosResponse = await Axios.get(
      `/report/workOrderSummeryReport?project_id=${project_id}&work_order_status=${status}`
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
