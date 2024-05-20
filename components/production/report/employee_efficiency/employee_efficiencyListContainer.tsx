"use client";

import { ReportDataTable } from "@/components/common/report/report-data-table";
import Loading from "@/loading";
import { EmployeeEfficiency } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Columns } from "./column";
import { EmployeeEfficiencyController } from "@/config/const";
import { getEmployeeEfficiency } from "@/data/report/employeeEfficiency";

const EmployeeEfficiencyListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employeeEfficiency"],
    queryFn: async () => {
      const data = await getEmployeeEfficiency();
      return JSON.parse(data.data) as EmployeeEfficiency[];
    },
  });
  const employeeEfficiency = data;
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
              {"EmployeeEfficiency"}
            </p>
          </div>
          <div className="w-full  ">
            <ReportDataTable
              columns={Columns}
              data={employeeEfficiency!}
              searchField="employee_id"
              placeholder="Search by Employee Id"
              fileName="EmployeeEfficiency"
              fullexport={true}
              exportDataFields={EmployeeEfficiencyController}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeEfficiencyListContainer;
