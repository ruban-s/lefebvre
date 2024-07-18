"use server";
import { Axios } from "@/action/axios";
import { ResponseData } from "@/types";

interface getHoursConsumptionReportProps {
  consumption: string;
  start_date: string;
  end_date: string;
}

export const getHoursConsumptionReport = async ({
  consumption,
  start_date,
  end_date,
}: getHoursConsumptionReportProps) => {
  try {
    const [start_percentage, end_percentage] = consumption.split("-");
    const status = "Released";
    var start = start_date.split("-");
    var end = end_date.split("-");
    console.log(start_percentage, end_percentage, start_date, end_date, status);
    console.log(`${start[2]}-${start[1]}-${start[0]}`);
    console.log(`${end[2]}-${end[1]}-${end[0]}`);
    const AxiosResponse = await Axios.get(`/report/hoursConsumptionReport`, {
      params: {
        end_percentage: end_percentage,
        start_percentage: start_percentage,
        from_date: `${start[2]}-${start[1]}-${start[0]}`,
        to_date: `${end[2]}-${end[1]}-${end[0]}`,
        status: status,
      },
    });
    console.log(AxiosResponse.data);
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
