"use client";
import { fetchDefaultForDashboard, fetchFormanList } from "@/commonfunction";
import { getDashBoardData } from "@/data/dashboard";
import { useDashboardStore } from "@/state";
import { LabourData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/loading";
import { ReportDataTable } from "@/components/common/report/report-data-table";
import { Columns } from "./column";
import { jobPositions } from "@/types/filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface FormanList {
  id: string;
  name: string;
}

interface FilterData {
  forman: string;
  labor_type: string;
}

const DashBoardBody = () => {
  const dashboard = useDashboardStore((state: any) => state.dashboard);
  const setDashboard = useDashboardStore((state: any) => state.setDashboard);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      console.log("refetching");
      const data = await getDashBoardData({ ...dashboard });
      return JSON.parse(data.data) as LabourData[];
    },
    refetchInterval: 5000,
    enabled: dashboard !== null && dashboard.formanList !== null,
  });

  //change dashboard state based on tabs
  const handleTabClick = (shiftType: string) => {
    if (shiftType !== dashboard?.shift_type) {
      setDashboard({
        ...dashboard,
        shift_type: shiftType,
      });
    }
  };

  const [formanOptions, setFormanOptions] = useState<FormanList[]>([]);
  const [filterData, setFilterData] = useState<FilterData>({
    labor_type: "",
    forman: "",
  });

  //forman options for dropdown
  const fetchFormanOptions = async () => {
    const forman = (await fetchFormanList()) as FormanList[];
    setFormanOptions(forman);
  };

  //onchange of select dropdown
  const handleSelect = (name: keyof FilterData, id: any) => {
    if (filterData[name] !== id) {
    }
    setFilterData({
      ...filterData,
      [name]: id,
    });
    setDashboard({
      ...dashboard,
      [name]: id,
    });
    //refetch the query
    // refetch();
  };

  //forman Dropdown
  const FormanDropDown = () => {
    return (
      <Select
        value={filterData.forman.toString()}
        onValueChange={(id: any) => handleSelect("forman", id)}>
        <SelectTrigger className="border-2 border-gray-300 bg-white p-2 rounded-xl w-[200px]">
          <SelectValue placeholder={"Select Forman"} />
        </SelectTrigger>
        <SelectContent>
          {formanOptions.map((data: FormanList, index: number) => (
            <SelectItem value={data.id.toString()} key={index}>
              {data.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  //labourType DropDown
  const LaborTypeDropDown = () => {
    return (
      <Select
        value={filterData.labor_type.toString()}
        onValueChange={(val: any) => {
          handleSelect("labor_type", val);
        }}>
        <SelectTrigger className="border-2 border-gray-300 bg-white p-2 rounded-xl w-[200px]">
          <SelectValue placeholder={"Select Labour_type"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"All"}>All</SelectItem>
          <SelectItem value={"Direct"}>Direct</SelectItem>
          <SelectItem value={"Indirect"}>Indirect</SelectItem>
        </SelectContent>
      </Select>
    );
  };

  useEffect(() => {
    // console.log(dashboard);
    if (dashboard !== null) {
      if (filterData.forman === "" || filterData.labor_type === "") {
        setFilterData({
          ...filterData,
          ["labor_type"]: dashboard.labor_type,
          ["forman"]: dashboard.forman,
        });
      }
      refetch(); //refetch the query
    } else {
      const fetchDefaultData = async () => {
        const defaultData = await fetchDefaultForDashboard();
        const { forman } = defaultData;
        //TODO : condition to check forman is null
        if (forman.length != 0) {
          setFilterData({
            ...filterData,
            ["labor_type"]: "All",
            ["forman"]: forman[0].id,
          });
          setDashboard({ ...defaultData, forman: forman[0].id });
        } else {
          toast.error(`Something went wrong`, {
            description: "Forman is empty",
            position: "top-right",
            dismissible: true,
          });
        }
      };
      //defaultData for store
      fetchDefaultData();
    }
    //forman dropdown
    fetchFormanOptions();
  }, [dashboard]);

  return (
    <div className="w-full h-full w-sm bg-white p-2 rounded-md min-h-[400px]">
      <Tabs defaultValue="day" className="h-auto">
        <div className="flex flex-row justify-between items-center">
          <TabsList className="bg-theme text-white">
            <TabsTrigger
              value="day"
              className="text-sm font-extrabold"
              onClick={() => handleTabClick("day")}>
              Day
            </TabsTrigger>
            <TabsTrigger
              value="night"
              className="text-sm font-extrabold"
              onClick={() => handleTabClick("night")}>
              Night
            </TabsTrigger>
          </TabsList>
          <div className="flex space-x-4 mt-4">
            <span>
              <FormanDropDown />
            </span>
            <span>
              <LaborTypeDropDown />
            </span>
          </div>
        </div>
        <TabsContent value="day">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {isLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : isError ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <p>Error loading data</p>
              </div>
            ) : (
              <div>
                {data && (
                  <ReportDataTable
                    data={data!}
                    columns={Columns}
                    searchField={"employee_id"}
                    filterColumn={"designation_id"}
                    title="Designation id"
                    placeholder={"employee_id"}
                    fileName="dashboard"
                    fullexport={true}
                    options={jobPositions}
                  />
                )}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="night">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {isLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : isError ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <p>Error loading data</p>
              </div>
            ) : (
              <div>
                {data && (
                  <ReportDataTable
                    data={data!}
                    columns={Columns}
                    searchField={"employee_id"}
                    filterColumn={"designation_id"}
                    title="Designation id"
                    placeholder={"employee_id"}
                    fileName="dashboard"
                    fullexport={true}
                    options={jobPositions}
                  />
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashBoardBody;
