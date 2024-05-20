"use client";

import { ReportDataTable } from "@/components/common/report/report-data-table";
import Loading from "@/loading";
import { CapacityUtilisation } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Columns } from "./column";
import { statuses } from "@/types/filter";
import { CapacityUtilisationController } from "@/config/const";
import { getCapacityUtilisation } from "@/data/report/capacityUtilisation";

const CapacityUtilisationListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["capacityUtilisation"],
    queryFn: async () => {
      const data = await getCapacityUtilisation();
      return JSON.parse(data.data) as CapacityUtilisation[];
    },
  });
  const capacityUtilisation = data;
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
              {"CapacityUtilisation"}
            </p>
          </div>
          <div className="w-full  ">
            <ReportDataTable
              columns={Columns}
              data={capacityUtilisation!}
              searchField="project_id"
              filterColumn="status"
              title="Status"
              options={statuses}
              placeholder="Search by Project Id"
              fileName="CapacityUtilisation"
              fullexport={true}
              exportDataFields={CapacityUtilisationController}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CapacityUtilisationListContainer;
