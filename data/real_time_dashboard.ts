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

//workersCount By Designation
export const getWorkersCountByDesignation = async ({
  date,
  attendance,
}: {
  date: string;
  attendance: string;
}) => {
  try {
    console.log(date, attendance);
    const AxiosResponse = await DashboardAxios.get(
      `realTime/workersByDesignation/count`,
      {
        params: { date, attendance },
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

//workersCount By Designation and Shift
export const getWorkersCountByDesignationAndShift = async ({
  date,
  shift_type,
  work_type,
}: {
  date: string;
  shift_type: string;
  work_type: string;
}) => {
  try {
    console.log(date, shift_type, work_type);
    const AxiosResponse = await DashboardAxios.get(
      `realTime/workersByShiftAndDesignation/count`,
      {
        params: { date, shift_type, work_type },
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

//workersCountBy Designation and Forman
export const getWorkersCountByDesignationAndForman = async ({
  date,
  shift_type,
  attendance,
  forman,
}: {
  date: string;
  shift_type: string;
  attendance: string;
  forman: string;
}) => {
  try {
    console.log(date, shift_type, forman, attendance);
    const AxiosResponse = await DashboardAxios.get(
      `/realTime/workersByFormanAndDesignation/count`,
      {
        params: { date, shift_type, attendance, forman },
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

//get workers by designation
export const getWorkersByDesignation = async ({
  date,
  attendance,
  designation,
}: {
  date: string;
  attendance: string;
  designation: string;
}) => {
  try {
    console.log(date, attendance, designation);
    const AxiosResponse = await DashboardAxios.get(
      `/realTime/workersByDesignation/data`,
      {
        params: {
          date,
          attendance,
          designation,
        },
      }
    );
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

//get workers by shift and designation
export const getWorkersByShiftAndDesignation = async ({
  date,
  shift_type,
  work_type,
  designation,
}: {
  date: string;
  shift_type: string;
  work_type: string;
  designation: string;
}) => {
  try {
    const AxiosResponse = await DashboardAxios.get(
      `/realTime//workersByShiftAndDesignation/data`,
      {
        params: {
          date,
          shift_type,
          work_type,
          designation,
        },
      }
    );
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

//get workers by forman and designation
export const getWorkersByFormanAndDesignation = async ({
  date,
  shift_type,
  attendance,
  forman,
  designation,
}: {
  date: string;
  shift_type: string;
  attendance: string;
  forman: string;
  designation: string;
}) => {
  try {
    // console.log(date, shift_type, attendance, forman, designation);
    const AxiosResponse = await DashboardAxios.get(
      `/realTime/workersByDesignationAndForman/data`,
      {
        params: {
          date,
          shift_type,
          attendance,
          forman,
          designation,
        },
      }
    );
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
