"use client";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaRegClock } from "react-icons/fa";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
interface CustomTimePickerProps {
  value: string;
  onChange: Function;
}
const CustomTimePicker = ({ value, onChange }: CustomTimePickerProps) => {
  const [time, setTime] = useState<string>(value);
  const [hour, setHour] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);

  useEffect(() => {
    setTime(value);
  }, [value]);
  useEffect(() => {
    onChange(time);
    const [hours, minutes] = time.split(":").map(Number);
    setHour(hours);
    setMinute(minutes);
  }, [time]);
  return (
    <div className="w-full p-0 h-[37px] mt-auto  mb-0 flex justify-start items-center ring-1 ring-slate-200 rounded-md">
      <Popover>
        <PopoverTrigger className="w-full flex  justify-start items-center pl-4 ">
          <p>{time === "" ? "--:--" : time}</p> <FaRegClock className="ml-2" />
        </PopoverTrigger>
        <PopoverContent className="w-[150px] h-auto flex flex-col justify-between items-center">
          <div className="w-full flex">
            <div className="w-[150px] mb-2 flex flex-col h-[50px] justify-center items-center bg-neutral-100 rounded-md shadow-md">
              <p className="text-sm text-neutral-500">hr:ms</p>
              <p className="text-md font-bold text-theme">{time}</p>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <ScrollArea className="w-[70px] h-[350px] flex flex-col justify-center items-center">
              {Array.from({ length: 24 }, (_, index) => index).map(
                (info, index) => {
                  return (
                    <Button
                      key={index}
                      variant={"ghost"}
                      onClick={() => {
                        const timeString = time;
                        const [hours, minutes] = timeString
                          .split(":")
                          .map(Number);

                        if (isNaN(minutes)) {
                          setTime(
                            (val) =>
                              `${
                                info.toString().length < 2
                                  ? `0` + `${info}`
                                  : info
                              }:00`
                          );
                        } else {
                          setTime(
                            (val) =>
                              `${
                                info.toString().length < 2
                                  ? `0` + `${info}`
                                  : `${info}`
                              }:${
                                minutes.toString().length < 2
                                  ? `0` + `${minutes}`
                                  : `${minutes}`
                              }`
                          );
                        }
                      }}
                      className={`m-1  ${
                        hour === info ? "bg-theme text-white" : "bg-blue-50"
                      } hover:bg-neutral-400 hover:text-white`}>
                      {info.toString().length < 2 ? `0` + `${info}` : info}
                    </Button>
                  );
                }
              )}
            </ScrollArea>
            <ScrollArea className="w-[70px] h-[350px] flex flex-col justify-center items-center">
              {Array.from({ length: 60 }, (_, index) => index).map(
                (info, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={() => {
                        const timeString = time;
                        const [hours, minutes] = timeString
                          .split(":")
                          .map(Number);

                        if (isNaN(hours)) {
                          setTime(
                            (val) =>
                              `${"01"}:${
                                info.toString().length < 2
                                  ? `0` + `${info}`
                                  : info
                              }`
                          );
                        } else {
                          setTime(
                            (val) =>
                              `${
                                hours.toString().length < 2
                                  ? `0` + `${hours}`
                                  : `${hours}`
                              }:${
                                info.toString().length < 2
                                  ? `0` + `${info}`
                                  : `${info}`
                              }`
                          );
                        }
                      }}
                      variant={"ghost"}
                      className={`m-1  ${
                        minute === info ? "bg-theme text-white" : "bg-blue-50"
                      } hover:bg-neutral-400 hover:text-white`}>
                      {info.toString().length < 2 ? `0` + `${info}` : info}
                    </Button>
                  );
                }
              )}
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomTimePicker;
