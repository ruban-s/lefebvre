"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { EmployeeData, ShiftData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { getAllEmployee } from "@/data/employee";
import { getAllShift } from "@/data/shift";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const EmployeeListContainer = () => {
  const [selectedShift, setShift] = useState<ShiftData>();
  const [curruntShift, setCurrentShift] = useState<EmployeeData[]>([]);
  const [previousShift, setPreviousShift] = useState<EmployeeData[]>([]);

  const { data: shift } = useQuery({
    queryKey: ["shift"],
    queryFn: async () => {
      const data = await getAllShift();
      return JSON.parse(data.data) as ShiftData[];
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const data = await getAllEmployee();
      var employee = JSON.parse(data.data) as EmployeeData[];
      employee.map((info, index) => {
        if (info.current_shift_id) {
          setCurrentShift([...curruntShift, info]);
        }
        if (info.previous_shift_id) {
          setPreviousShift([...previousShift, info]);
        }
      });
      return JSON.parse(data.data) as EmployeeData[];
    },
  });
  const employees = data;

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className=" w-full h-auto  flex justify-start p-2 items-center ">
            <p className="text-lg w-auto font-semibold ">
              {"Shift-Employees"} :{" "}
            </p>
            <Select
              value={selectedShift?.shift_name}
              onValueChange={(value) => {
                console.log(value);
                // console.log(shift?.filter((info) => info.shift_name === value));
              }}>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Select Shift Type" />
              </SelectTrigger>
              <SelectContent>
                {shift?.map((info, index) => {
                  return (
                    <SelectItem key={index} value={info.shift_name}>
                      {info.shift_name}
                    </SelectItem>
                  );
                })}
                <SelectItem value="--">No Shift </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex ">
            <div className="flex-1 h-[800px] m-2 ">
              <div className="w-full h-[70px] bg-blue-400 flex justify-center items-center rounded-tl-md rounded-tr-md">
                <p className="text-lg text-white">Day Shift</p>
              </div>
              <ScrollArea className=" w-full h-[730px] border-1 border border-black p-2">
                <div className="my-3 p-2 w-[130px]  bg-neutral-100  border-0 border-l-2 border-l-neutral-500">
                  <p className="text-md text-neutral-700">Last Shift</p>
                </div>
                {employees?.map((info, index) => {
                  if (info.previous_shift_id) {
                    var newShift = shift?.filter(
                      (shiftInfo) => shiftInfo.id == info.previous_shift_id
                    );
                    if (
                      newShift![0].shift_type === "Day" &&
                      info.designation_id !== "FOREMEN"
                    ) {
                      return (
                        <div
                          key={index}
                          className="w-full mb-2 shadow-sm p-2 border border-1 border-slate-200  cursor-pointer hover:shadow-lg rounded-lg">
                          <p className="text-sm font-bold">
                            {info.first_name}
                            {info.last_name}
                            <span>
                              <Badge
                                className={`rounded-sm mr-2 ml-2 ${
                                  info.status === "Active"
                                    ? "bg-green-500"
                                    : "bg-slate-500"
                                }`}>
                                {info.status}
                              </Badge>
                              <Badge
                                className={`rounded-sm bg-slate-500
                                `}>
                                {" "}
                                {info.previous_shift_name}
                              </Badge>
                            </span>
                          </p>
                        </div>
                      );
                    }
                  }
                })}
                <div className="my-3 p-2 w-[130px]  bg-green-100  border-0 border-l-2 border-l-green-500">
                  <p className="text-md text-green-700">Current Shift</p>
                </div>
                {employees?.map((info, index) => {
                  if (info.current_shift_id) {
                    var newShift = shift?.filter(
                      (shiftInfo) => shiftInfo.id == info.current_shift_id
                    );
                    if (
                      newShift![0].shift_type === "Day" &&
                      info.designation_id !== "FOREMEN"
                    ) {
                      return (
                        <div
                          key={index}
                          className="w-full mb-2 shadow-sm p-2 border border-1 border-slate-200 rounded-md  cursor-pointer hover:shadow-lg">
                          <p className="text-sm font-bold">
                            {info.first_name}
                            {info.last_name}
                            <span>
                              <Badge
                                className={` ml-2 ${
                                  info.status === "Active"
                                    ? "bg-green-500"
                                    : "bg-slate-500"
                                }`}>
                                {info.status}
                              </Badge>
                            </span>
                          </p>
                          <div></div>
                        </div>
                      );
                    }
                  }
                })}
              </ScrollArea>
            </div>
            <div className="flex-1 h-[800px] m-2 ">
              <div className="w-full h-[70px] bg-black flex justify-center items-center rounded-tl-md rounded-tr-md">
                <p className="text-lg text-white">Night Shift</p>
              </div>
              <ScrollArea className=" w-full h-[730px] border-1 border border-black p-2">
                <div className="my-3 p-2 w-[130px]  bg-neutral-100  border-0 border-l-2 border-l-neutral-500">
                  <p className="text-md text-neutral-700">Last Shift</p>
                </div>
                {employees?.map((info, index) => {
                  if (info.previous_shift_id) {
                    var newShift = shift?.filter(
                      (shiftInfo) => shiftInfo.id == info.previous_shift_id
                    );
                    if (
                      newShift![0].shift_type === "Night" &&
                      info.designation_id !== "FOREMEN"
                    ) {
                      return (
                        <div
                          key={index}
                          className="w-full mb-2 shadow-sm p-2 border border-1 border-slate-200  cursor-pointer hover:shadow-lg">
                          <p className="text-sm font-bold">
                            {info.first_name}
                            {info.last_name}
                            <span>
                              <Badge
                                className={`${
                                  info.status === "Active"
                                    ? "bg-green-500"
                                    : "bg-slate-500"
                                }`}>
                                {info.status}
                              </Badge>
                            </span>
                          </p>
                          <div></div>
                        </div>
                      );
                    }
                  }
                })}
                <div className="my-3 p-2 w-[130px]  bg-green-100  border-0 border-l-2 border-l-green-500">
                  <p className="text-md text-green-700">Current Shift</p>
                </div>
                {employees?.map((info, index) => {
                  if (info.current_shift_id) {
                    var newShift = shift?.filter(
                      (shiftInfo) => shiftInfo.id == info.current_shift_id
                    );
                    if (
                      newShift![0].shift_type === "Night" &&
                      info.designation_id !== "FOREMEN"
                    ) {
                      return (
                        <div
                          key={index}
                          className="w-full mb-2 shadow-sm p-2 border border-1 border-slate-200 rounded-md  cursor-pointer hover:shadow-lg">
                          <p className="text-sm font-bold">
                            {info.first_name}
                            {info.last_name}
                            <span>
                              <Badge
                                className={`${
                                  info.status === "Active"
                                    ? "bg-green-500"
                                    : "bg-slate-500"
                                }`}>
                                {info.status}
                              </Badge>
                            </span>
                          </p>
                          <div></div>
                        </div>
                      );
                    }
                  }
                })}
              </ScrollArea>
            </div>
            <div className="flex-1 h-[800px] m-2 ">
              <div className="w-full h-[70px] bg-slate-400 flex justify-center items-center rounded-tl-md rounded-tr-md">
                <p className="text-lg text-white">No Shift</p>
              </div>
              <div className=" w-full h-[730px] border-1 border border-slate-400 p-2">
                {employees?.map((info, index) => {
                  if (!info.current_shift_id && !info.previous_shift_id) {
                    return (
                      <div
                        key={index}
                        className="w-full mb-2 shadow-sm p-2  cursor-pointer">
                        <p>
                          {info.first_name}
                          {info.last_name}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default EmployeeListContainer;
