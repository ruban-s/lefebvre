"use server";

import { Axios, DashboardAxios } from "@/action/axios";
import { ResponseData } from "@/types";

interface getDashboardDataProps {
  date: string;
  forman: any;
  shift_type: string;
  attendance_type: string;
  labor_type: string;
}

export const getDashBoardData = async ({
  date,
  forman,
  shift_type,
  attendance_type,
  labor_type,
}: getDashboardDataProps) => {
  try {
    if (forman === null) {
      throw new Error("Forman is empty.Contact the admin");
    }
    const forman_id = forman;
    // console.log(date, forman_id, shift_type, attendance_type, labor_type);
    const AxiosResponse = await Axios.get(`/labor/labourDashboard`, {
      params: {
        shift_date: date,
        forman_id: forman_id,
        shift_type: shift_type,
        attendance_type: attendance_type,
        labor_type: labor_type,
      },
    });
    // console.log(AxiosResponse.data);
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

//projectCard
export const getReleasedProjectBydateAndStatus = async (
  date: string,
  status: string
) => {
  try {
    const AxiosResponse = await Axios.get(
      `/project/getAllProjectByShiftDateAnsStatus`,
      {
        params: {
          shift_date: date,
          status: status,
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

export const getBarChartDataByMonthAndYear = async (
  month: string,
  year: string
) => {
  try {
    const AxiosResponse = await DashboardAxios.get(
      `/dashboard/barchart/jobtype/getAllJobTypeByMonthAndYear`,
      {
        params: {
          month: month,
          year: year,
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
