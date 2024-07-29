"use client";
import { IoBarChart } from "react-icons/io5";
import { format } from "date-fns";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const currentDate = format(new Date(), "MM/dd/yyyy");
  const navigateUrl = `/production/dashboard/barchart`;
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className="w-full h-full flex flex-row justify-between px-4">
        <div className="flex flex-row gap-2">
          <Button className="bg-blue-300 text-black text-lg hover:bg-blue-800 hover:text-blue-100">
            Prev
          </Button>
          <Button className="bg-slate-800 text-lg hover:bg-slate-400 hover:text-slate-800">
            Current
          </Button>
        </div>
        <div className="bg-white p-2 text-xl tracking-widest shadow-md">
          {currentDate}
        </div>
        <div className="p-2 bg-white text-2xl border-2 rounded-full border-blue-800 cursor-pointer">
          {/* <Link href={navigateUrl}> */}
          <IoBarChart className="text-slate-800 text-2xl" />
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
