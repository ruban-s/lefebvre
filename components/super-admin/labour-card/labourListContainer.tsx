"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { LabourData, ProjectData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { projectColumns } from "./column";
import { getAllLabourCard } from "@/data/labour-card";
import { labourCardMaintanceField, projectController } from "@/config/const";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { parse, format } from "date-fns";
import { LabourCardDataTableSuperAdmin } from "./labourcarddatatablesuperadmin";
import Image from "next/image";

const LabourListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["labour-card"],
    queryFn: async () => {
      const data = await getAllLabourCard();
      console.log(JSON.parse(data.data) as LabourData[]);
      return JSON.parse(data.data) as LabourData[];
    },
  });
  const fullData = data;
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [disabledDates, setDisbleDates] = useState<Date[]>([]);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [tableData, setTableDate] = useState([]);

  const setRange = (date: DateRange | undefined) => {
    setDateRange(date);
    const fromDate = date?.from;
    const toDate = date?.to;
    const formattedFromDate = fromDate ? new Date(fromDate) : undefined;
    formattedFromDate?.setHours(0, 0, 0, 0);
    const formattedToDate = toDate ? new Date(toDate) : undefined;
    formattedToDate?.setHours(0, 0, 0, 0);
    setFromDate(formattedFromDate);
    setToDate(formattedToDate);
  };

  const ReturnData = ({ data }: { data: any }) => {
    const glCodeParts = data.gl_code ? data.gl_code.split("&")[0] : "--";
    const glDescriptionParts = data.gl_code ? data.gl_code.split("&")[1] : "--";
    return {
      ...data,
      gl_code: glCodeParts || "--",
      gl_description: glDescriptionParts || "--",
    };
  };

  const fetchData = (tempData: any) => {
    let filteredData;
    if (fromDate && toDate) {
      filteredData = tempData
        .filter((item: any) => {
          if (item.shift_date) {
            const dateStr = parse(item.shift_date, "dd-MM-yyyy", new Date());
            dateStr.setHours(0, 0, 0, 0);
            return (
              dateStr.getTime() >= fromDate.getTime() &&
              dateStr.getTime() <= toDate.getTime()
            );
          }
          return false;
        })
        .map((data: any) => {
          return ReturnData({ data });
        });
    } else if (fromDate) {
      filteredData = tempData
        .filter((item: any) => {
          if (item.shift_date) {
            const dateStr = parse(item.shift_date, "dd-MM-yyyy", new Date());
            dateStr.setHours(0, 0, 0, 0);
            return dateStr.getTime() === fromDate.getTime();
          }
          return false;
        })
        .map((data: any) => {
          return ReturnData({ data });
        });
    } else {
      filteredData = tempData
        .filter((item: any) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (item.shift_date) {
            const dateStr = parse(item.shift_date, "dd-MM-yyyy", new Date());
            dateStr.setHours(0, 0, 0, 0);
            if (dateStr === today) {
              console.log(dateStr);
            }
            return dateStr.getTime() === today.getTime();
          }
        })
        .map((data: any) => {
          return ReturnData({ data });
        });
    }
    setTableDate(filteredData);
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
    // <div className="w-full h-[100%] bg-red-500 m-2 ">demo</div>
    <Tabs defaultValue="labourCardList" className="w-full">
      <TabsList className="bg-theme text-white">
        <TabsTrigger value="labourCardDashboard">
          Labour Card Dashboard
        </TabsTrigger>
        <TabsTrigger value="labourCardList">Labour Card List</TabsTrigger>
      </TabsList>
      <TabsContent
        value="labourCardDashboard"
        className="w-full h-full flex justify-center items-center">
        <div className="w-full h-full bg-white rounded-sm shadow-sm flex flex-row justify-center items-center">
          <Image
            src="/bg-waiting.jpeg"
            width={200}
            height={200}
            alt="LEFEBVRE"
            className="object-contain rounded-lg  "
          />
        </div>
      </TabsContent>
      <TabsContent value="labourCardList">
        <div className="w-[100%]  h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
          {isLoading ? (
            <div className="w-full min-h-[500px] justify-center items-center flex">
              <Loading />
            </div>
          ) : (
            <>
              <div className="w-full  ">
                <LabourCardDataTableSuperAdmin
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
      </TabsContent>
    </Tabs>
  );
};
export default LabourListContainer;
