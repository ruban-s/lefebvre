"use client";
import { IoBarChart } from "react-icons/io5";
import { format } from "date-fns";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/state";
import { getCurrentDate, previousDate } from "@/commonfunction";

const DashboardHeader = () => {
  const currentDate = format(new Date(), "dd/MM/yyyy");
  const navigateUrl = `/production/dashboard/barchart`;
  const dashboard = useDashboardStore((state: any) => state.dashboard);
  const setDashboard = useDashboardStore((state: any) => state.setDashboard);

  const handleOnclick = (name: any) => {
    if (name === "prev") {
      setDashboard({ ...dashboard, ["date"]: previousDate(), prev_date: true });
    } else {
      setDashboard({
        ...dashboard,
        ["date"]: getCurrentDate(),
        prev_date: false,
      });
    }
  };

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className="w-full h-full flex flex-row justify-between px-4">
        <div className="flex flex-row gap-2">
          <Button
            className={` ${
              dashboard && dashboard.prev_date
                ? "bg-black text-white hover:bg-black"
                : "bg-blue-300 text-black hover:bg-blue-300"
            }`}
            onClick={() => handleOnclick("prev")}>
            Prev Day
          </Button>
          <Button
            className={` ${
              dashboard && !dashboard.prev_date
                ? "bg-black text-white hover:bg-black"
                : "bg-blue-300 text-black hover:bg-blue-300"
            }`}
            onClick={() => handleOnclick("next")}>
            Current Day
          </Button>
        </div>
        <div className="bg-white p-2 text-xl tracking-widest shadow-md">
          {currentDate}
        </div>
        <div className="p-2 bg-white text-2xl border-2 rounded-full border-blue-800 cursor-pointer">
          <Link href={navigateUrl}>
            <IoBarChart className="text-slate-800 text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
