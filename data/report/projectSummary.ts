"use server";

import { Axios } from "@/action/axios";
import { ProjectSummary, ResponseData } from "@/types";

interface ProjectResponseData {
  status: boolean;
  message: string;
  data: string | ProjectSummary[];
  authToken: string | null;
}

export const getProjectSummary = async (status: string) => {
  try {
    let data: ProjectSummary[] = [];
    if (status === "Released") {
      const axiosResponse = await Axios.get(
        `/report/projectSummeryReport?project_status=Released`
      );
      data = JSON.parse(axiosResponse.data.data);
    } else if (status === "Unreleased") {
      const axiosResponse = await Axios.get(
        `/report/projectSummeryReport?project_status=unReleased`
      );
      data = JSON.parse(axiosResponse.data.data);
    } else if (status === "Closed") {
      const axiosResponse = await Axios.get(
        `/report/projectSummeryReport?project_status=Closed`
      );
      data = JSON.parse(axiosResponse.data.data);
    } else if (status === "All") {
      const axiosResponseReleased = await Axios.get(
        `/report/projectSummeryReport?project_status=Released`
      );
      const axiosResponseUnreleased = await Axios.get(
        `/report/projectSummeryReport?project_status=unReleased`
      );
      const axiosResponseClosed = await Axios.get(
        `/report/projectSummeryReport?project_status=Closed`
      );

      const releasedData = JSON.parse(axiosResponseReleased.data.data);
      const unreleasedData = JSON.parse(axiosResponseUnreleased.data.data);
      const closedData = JSON.parse(axiosResponseClosed.data.data);

      data = [...releasedData, ...unreleasedData, ...closedData];
    }
    const response: ProjectResponseData = {
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
