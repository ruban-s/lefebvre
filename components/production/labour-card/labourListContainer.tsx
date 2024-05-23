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
      const formattedFromDate = format(fromDate, "dd-MM-yyyy");
      const formattedToDate = format(toDate, "dd-MM-yyyy");
      const filteredData = tempData.filter((item: any) => {
        const dateStr = item.shift_date;
        if (dateStr) {
          return dateStr >= formattedFromDate && dateStr <= formattedToDate;
        }
        return false;
      });
      setTableDate(filteredData);
    } else if (fromDate) {
      const formattedFromDate = format(fromDate, "dd-MM-yyyy");
      const filteredData = tempData.filter((item: any) => {
        const dateStr = item.shift_date;
        if (dateStr) {
          return dateStr === formattedFromDate;
        }
        return false;
      });
      setTableDate(filteredData);
    } else {
      const today = new Date();
      const formattedTodayDate = format(today, "dd-MM-yyyy");
      const filteredData = tempData?.filter((item: any) => {
        const dateStr = item.shift_date;
        if (dateStr) {
          return dateStr === formattedTodayDate;
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
    return <p className="w-full bg-white px-1 py-2">Data not found</p>;
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