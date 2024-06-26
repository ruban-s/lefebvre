"use client";

import { ReportDataTable } from "@/components/common/report/report-data-table";
import Loading from "@/loading";
import { IndirectReport } from "@/types";
import { Columns } from "./column";
import {
  EmployeeReportController,
  IndirectReportController,
} from "@/config/const";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getIndirectReport } from "@/data/report/indirectReport";

interface IndirectreportListContainerProps {
  filterData: {
    from_date: string;
    to_date: string;
  };
  defaultData: {
    from_date: Date;
    to_date: Date;
  };
}

const IndirectreportListContainer = ({
  filterData,
  defaultData,
}: IndirectreportListContainerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableDate] = useState<IndirectReport[] | undefined>([]);
  const [fullData, setFullData] = useState<IndirectReport[] | undefined>();
  const fetchFullData = async () => {
    if (filterData.from_date !== "" && filterData.to_date !== "") {
      const data = await getIndirectReport(
        filterData.from_date,
        filterData.to_date
      );
      setTableDate(JSON.parse(data.data) as IndirectReport[]);
      setIsLoading(false);
      return;
    } else if (defaultData.from_date && defaultData.to_date) {
      const formattedFromDate = format(
        new Date(defaultData.from_date),
        "yyyy-MM-dd"
      );
      const formattedToDate = format(
        new Date(defaultData.to_date),
        "yyyy-MM-dd"
      );
      const data = await getIndirectReport(formattedFromDate, formattedToDate);
      setTableDate(JSON.parse(data.data) as IndirectReport[]);
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
            <p className="text-lg font-bold text-white ">{"IndirectReport"}</p>
          </div>
          <div className="w-full  ">
            <ReportDataTable
              columns={Columns}
              data={tableData!}
              searchField="employee_id"
              placeholder="Search by Employee Id"
              fileName="indirectReport"
              fullexport={true}
              exportDataFields={IndirectReportController}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default IndirectreportListContainer;
