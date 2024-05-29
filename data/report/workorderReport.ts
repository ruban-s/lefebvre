"use server";
import { Axios } from "@/action/axios";
import { ResponseData, WorkOrderDataReport } from "@/types";

interface getWorkOrderReportProps {
  project_id: string;
}

interface WorkOrderReportResponseData {
  status: boolean;
  message: string;
  data: string | WorkOrderDataReport[];
  authToken: string | null;
}

export const getWorkOrderReport = async ({
  project_id,
}: getWorkOrderReportProps) => {
  try {
    let data: WorkOrderDataReport[] = [];
    const axiosResponseReleased = await Axios.get(
      `/report/workOrderSummeryReport?project_id=${project_id}&work_order_status=Released`
    );
    const axiosResponseUnreleased = await Axios.get(
      `/report/workOrderSummeryReport?project_id=${project_id}&work_order_status=Unreleased`
    );
    const axiosResponseClosed = await Axios.get(
      `/report/workOrderSummeryReport?project_id=${project_id}&work_order_status=Closed`
    );
    const axiosResponseCancelled = await Axios.get(
      `/report/workOrderSummeryReport?project_id=${project_id}&work_order_status=Cancelled`
    );
    const releasedData = JSON.parse(axiosResponseReleased.data.data);
    const unreleasedData = JSON.parse(axiosResponseUnreleased.data.data);
    const closedData = JSON.parse(axiosResponseClosed.data.data);
    const cancelledData = JSON.parse(axiosResponseCancelled.data.data);

    data = [
      ...releasedData,
      ...unreleasedData,
      ...closedData,
      ...cancelledData,
    ];

    const response: WorkOrderReportResponseData = {
      status: true,
      message: "Get All Data successfully",
      data,
      authToken: null,
    };
    return response;
  } catch (error) {
    const errorResponse: ResponseData = {
      status: false,
      message: JSON.stringify(error),
      data: "",
    };
    return errorResponse;
  }
};
