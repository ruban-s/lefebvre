"use client";

import { ReportDataTable } from "@/components/common/report/report-data-table";
import Loading from "@/loading";
import { EmployeeReport } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Columns } from "./column";
import { activeInactiveStatuses } from "@/types/filter";
import { EmployeeReportController } from "@/config/const";
import { getEmployeeReport } from "@/data/report/employeeReport";

const EmployeeReportListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employeeReport"],
    queryFn: async () => {
      const data = await getEmployeeReport();
      return JSON.parse(data.data) as EmployeeReport[];
    },
  });
  const employeeReport = data;
  return (
    <div className="w-[100%]  h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">{"EmployeeReport"}</p>
          </div>
          <div className="w-full  ">
            <ReportDataTable
              columns={Columns}
              data={employeeReport!}
              searchField="employee_id"
              filterColumn="status"
              title="Status"
              options={activeInactiveStatuses}
              placeholder="Search by Employee Id"
              fileName="EmployeeReport"
              fullexport={true}
              exportDataFields={EmployeeReportController}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeReportListContainer;
