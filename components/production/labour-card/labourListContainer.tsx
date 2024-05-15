"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { LabourData, ProjectData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { projectColumns } from "./column";
import { getAllLabourCard } from "@/data/labour-card";
import { labourCardMaintanceField, projectController } from "@/config/const";
import { LabourCardDataTable } from "./labourcarddatatable";
import { DateRange } from "react-day-picker";
import { parse, format } from "date-fns";

const LabourListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["labour-card"],
    queryFn: async () => {
      const data = await getAllLabourCard();
      return JSON.parse(data.data) as LabourData[];
    },
  });
  const fullData = data;
  // const labours = data;
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [disabledDates, setDisbleDates] = useState<Date[]>([]);
  const [fromDate, setFromDate] = useState<string | undefined>("");
  const [toDate, setToDate] = useState<string | undefined>("");
  const [tableData, setTableDate] = useState([]);

  const setRange = (date: DateRange | undefined) => {
    setDateRange(date);
    const fromDate = date?.from;
    const toDate = date?.to;
    const formattedFromDate = fromDate
      ? format(new Date(fromDate), "yyyy-MM-dd")
      : "";
    const formattedToDate = toDate
      ? format(new Date(toDate), "yyyy-MM-dd")
      : "";
    setFromDate(formattedFromDate);
    setToDate(formattedToDate);
  };

  const fetchData = (tempData: any) => {
    if (fromDate && toDate) {
      const filteredData = tempData.filter((item: any) => {
        const dateStr = item.createdDate;
        if (item.createdDate) {
          const parsedDate = parse(
            dateStr,
            "MMM dd, yyyy, h:mm:ss a",
            new Date()
          );
          const formattedDate = format(parsedDate, "yyyy-MM-dd");
          return formattedDate >= fromDate && formattedDate <= toDate;
        }
        return false;
      });
      setTableDate(filteredData);
    } else if (fromDate) {
      const filteredData = tempData.filter((item: any) => {
        const dateStr = item.createdDate;
        if (item.createdDate) {
          const parsedDate = parse(
            dateStr,
            "MMM dd, yyyy, h:mm:ss a",
            new Date()
          );
          const formattedDate = format(parsedDate, "yyyy-MM-dd");
          return formattedDate === fromDate;
        }
        return false;
      });
      setTableDate(filteredData);
    } else {
      const today = new Date();
      const formattedTodayDate = format(today, "yyyy-MM-dd");
      const filteredData = tempData?.filter((item: any) => {
        const dateStr = item.createdDate;
        if (item.createdDate) {
          const parsedDate = parse(
            dateStr,
            "MMM dd, yyyy, h:mm:ss a",
            new Date()
          );
          const formattedDate = format(parsedDate, "yyyy-MM-dd");
          return formattedDate === formattedTodayDate;
        }
        return false;
      });
      setTableDate(filteredData);
    }
  };

  useEffect(() => {
    if (fullData) {
      fetchData(fullData);
    }
  }, [fullData, fromDate, toDate]);

  if (isError) {
    return <p>error</p>;
  }

  return (
    <div className="w-[100%] h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">{"Labour Cards"}</p>
          </div>
          <div className="w-full ">
            <LabourCardDataTable
              fullData={fullData!}
              labourCardFields={labourCardMaintanceField}
              columns={projectColumns}
              data={tableData!}
              setRange={setRange}
              dateRange={dateRange}
              fromDate={fromDate}
              toDate={toDate}
              disabledDates={disabledDates}
              searchName="employee_id"
              fileName="Labour Card"
              exportDataFields={projectController}
              fullexport={true}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default LabourListContainer;