"use client";

import { ReportDataTable } from "@/components/common/report/report-data-table";
import { getProjectSummary } from "@/data/report/projectSummary";
import Loading from "@/loading";
import { ProjectSummary } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./column";
import { statuses } from "@/types/filter";
import { ProjectSummaryController } from "@/config/const";

const ProjectSummaryListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectSummary"],
    queryFn: async () => {
      const data = await getProjectSummary("All");
      return data.data as ProjectSummary[];
    },
  });
  const projectSummary = data;
  return (
    <div className="w-[100%]  h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">{"Project Summary"}</p>
          </div>
          <div className="w-full  ">
            <ReportDataTable
              columns={columns}
              data={projectSummary!}
              searchField="projectId"
              filterColumn="status"
              title="Status"
              options={statuses}
              placeholder="Search by Project Id"
              fileName="ProjectSummary"
              fullexport={true}
              exportDataFields={ProjectSummaryController}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectSummaryListContainer;
