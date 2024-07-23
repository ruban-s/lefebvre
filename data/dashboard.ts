"use server";

import { Axios } from "@/action/axios";
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
export const getReleasedProjectBydate = async (date: string) => {
  try {
    const AxiosResponse = await Axios.get(`/project/getAllProjectByShiftDate`, {
      params: {
        shift_date: date,
      },
    });
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
