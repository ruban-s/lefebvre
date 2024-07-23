"use client";
import { IoBarChart } from "react-icons/io5";
import { format } from "date-fns";
import React from "react";

const DashboardHeader = () => {
  const currentDate = format(new Date(), "MM/dd/yyyy");
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className="w-[90%] flex flex-row justify-center">
        <div className="bg-white p-2 text-xl tracking-widest shadow-md">
          {currentDate}
        </div>
      </div>
      <div className="pr-2 pt-2">
        <div className="p-2 bg-white text-2xl border-2 rounded-full border-blue-800 cursor-pointer">
          <IoBarChart className="text-slate-800 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
