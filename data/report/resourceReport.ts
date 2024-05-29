"use server";

import { Axios } from "@/action/axios";
import { ResourceReport, ResponseData } from "@/types";

interface getResourceReportProps {
  project_id: string;
  work_order_Id: string;
}

interface ResourceReportResponseData {
  status: boolean;
  message: string;
  data: string | ResourceReport[];
  authToken: string | null;
}

export const getResourceReport = async ({
  project_id,
  work_order_Id,
}: getResourceReportProps) => {
  try {
    let data: ResourceReport[] = [];
    const axiosResponseReleased = await Axios.get(
      `/report/resourceSummeryReport?project_id=${project_id}&resource_status=Released&work_order_id=${work_order_Id}`
    );
    const axiosResponseUnreleased = await Axios.get(
      `/report/resourceSummeryReport?project_id=${project_id}&resource_status=Unreleased&work_order_id=${work_order_Id}`
    );
    const axiosResponseClosed = await Axios.get(
      `/report/resourceSummeryReport?project_id=${project_id}&resource_status=Closed&work_order_id=${work_order_Id}`
    );
    const axiosResponseCancelled = await Axios.get(
      `/report/resourceSummeryReport?project_id=${project_id}&resource_status=Cancelled&work_order_id=${work_order_Id}`
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

    const response: ResourceReportResponseData = {
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
