"use client";

import { ReportDataTable } from "@/components/common/report/report-data-table";
import Loading from "@/loading";
import { IndirectReport, LabourTicketReport } from "@/types";
import { Columns } from "./column";
import {
  EmployeeReportController,
  LabourTicketController,
} from "@/config/const";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getIndirectReport } from "@/data/report/indirectReport";
import { getLabourTicketReport } from "@/data/report/labourTicketReport";

interface LabourTicketReportListContainerProps {
  filterData: {
    from_date: string;
    to_date: string;
  };
  defaultData: {
    from_date: Date;
    to_date: Date;
  };
}

const LabourTicketReportListContainer = ({
  filterData,
  defaultData,
}: LabourTicketReportListContainerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableDate] = useState<LabourTicketReport[] | undefined>(
    []
  );
  const [fromDate, setFromDate] = useState<string | undefined>("");
  const [toDate, setToDate] = useState<string | undefined>("");
  const [fullData, setFullData] = useState<LabourTicketReport[] | undefined>();
  const fetchFullData = async () => {
    if (filterData.from_date !== "" && filterData.to_date !== "") {
      const data = await getLabourTicketReport(
        filterData.from_date,
        filterData.to_date
      );
      // console.log(filterData.from_date, filterData.to_date);
      setFromDate(filterData.from_date);
      setToDate(filterData.to_date);
      setTableDate(JSON.parse(data.data) as LabourTicketReport[]);
      setIsLoading(false);
      return;
    } else if (defaultData.from_date && defaultData.to_date) {
      console.log(defaultData.from_date);
      // console.log(defaultData.to_date);
      const formattedFromDate = format(
        new Date(defaultData.from_date),
        "yyyy-MM-dd"
      );
      const formattedToDate = format(
        new Date(defaultData.to_date),
        "yyyy-MM-dd"
      );
      setFromDate(filterData.from_date);
      setToDate(filterData.to_date);
      const data = await getLabourTicketReport(
        formattedFromDate,
        formattedToDate
      );
      setTableDate(JSON.parse(data.data) as LabourTicketReport[]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchFullData();
    };
    loadData();
  }, [filterData, defaultData]);
  return (
    <div className="w-[100%]  h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">
              {"LabourTicketReport"}
            </p>
          </div>
          <div className="w-full  ">
            <ReportDataTable
              columns={Columns}
              data={tableData!}
              searchField="transaction_id"
              placeholder="Search by Transaction Id"
              fileName="LabourTicketReport"
              fullexport={true}
              exportDataFields={LabourTicketController}
              fromDate={fromDate}
              toDate={toDate}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LabourTicketReportListContainer;
