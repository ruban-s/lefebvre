"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { LabourData, ProjectData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { projectColumns } from "./column";
import { getAllLabourCard } from "@/data/labour-card";
import { projectController } from "@/config/const";
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

const LabourListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["labour-card"],
    queryFn: async () => {
      const data = await getAllLabourCard();
      return JSON.parse(data.data) as LabourData[];
    },
  });
  const labours = data;

  if (isError) {
    return <p>error</p>;
  }
  return (
    <div className="w-full h-[100%] bg-red-500 m-2 ">demo</div>
    // <Tabs defaultValue="labourCardDashboard" className="w-full">
    //   <TabsList className="bg-theme text-white">
    //     <TabsTrigger value="labourCardDashboard">
    //       Labour Card Dashboard
    //     </TabsTrigger>
    //     <TabsTrigger value="labourCardList">Labour Card List</TabsTrigger>
    //   </TabsList>
    //   <TabsContent
    //     value="labourCardDashboard"
    //     className="w-full h-full flex justify-center items-center">
    //     <div className="w-full h-full bg-white rounded-sm shadow-sm">de</div>
    //   </TabsContent>
    //   <TabsContent value="labourCardList">
    //     <div className="w-[100%]  h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
    //       {isLoading ? (
    //         <div className="w-full min-h-[500px] justify-center items-center flex">
    //           <Loading />
    //         </div>
    //       ) : (
    //         <>
    //           <div className="w-full  ">
    //             <DataTable
    //               columns={projectColumns}
    //               data={labours!}
    //               searchName="project_id"
    //               fileName="Project"
    //               exportDataFields={projectController}
    //             />
    //           </div>
    //         </>
    //       )}
    //     </div>
    //   </TabsContent>
    // </Tabs>
  );
};
export default LabourListContainer;
