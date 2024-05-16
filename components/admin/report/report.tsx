"use client";
import { ReportTabs } from "@/config/const";
import { TabData } from "@/types";
import Link from "next/link";
import React, { useState } from "react";

const ReportScreen = () => {
  const [tabs, setTabs] = useState<TabData[]>(ReportTabs);
  return (
    <main className="w-full h-full bg-white overflow-auto p-10">
      <main className="w-full h-auto grid justify-center items-center  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  gap-6">
        {tabs?.map(({ icon: Icon, ...info }: TabData, index: number) => {
          return (
            <Link
              key={index}
              href={info.link}
              className={`w-full h-[90px] sm:h-[110px]  md:h-[220px] ld:h-[220px] flex flex-col justify-center  space-x-2   md:justify-evenly items-center p-2 bg-white shadow-md  cursor-pointer rounded-lg hover:ring-1 hover:ring-theme`}>
              <div className="p-2 sm:p-3 md:p-4 lg:p-6 bg-blue-50 rounded-full">
                <Icon className="text-theme  text-[15px] sm:text-[20px] md:text-[40px]" />
              </div>
              <p className="text-theme font-bold">{info.label}</p>
            </Link>
          );
        })}
      </main>
    </main>
  );
};

export default ReportScreen;
