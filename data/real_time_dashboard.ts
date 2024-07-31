"use server";
import { DashboardAxios } from "@/action/axios";
import { ResponseData } from "@/types";

//workersCount
export const getWorkersCount = async (date: string) => {
  try {
    // console.log(date);
    const AxiosResponse = await DashboardAxios.get(`/realTime/workers/count`, {
      params: { date },
    });
    // console.log(AxiosResponse);
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

//workersCount by shift
export const getWorkersCountByShift = async ({
  date,
  shift_type,
}: {
  date: string;
  shift_type: string;
}) => {
  try {
    const AxiosResponse = await DashboardAxios.get(
      `/realTime/workersByShift/count`,
      {
        params: {
          date,
          shift_type,
        },
      }
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

//workersCount by forman
export const getWorkersCountByForman = async ({
  date,
  shift_type,
  forman,
}: {
  date: string;
  shift_type: string;
  forman: string;
}) => {
  try {
    const AxiosResponse = await DashboardAxios.get(
      `/realTime/workersByForman/count`,
      {
        params: {
          date,
          shift_type,
          forman,
        },
      }
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
