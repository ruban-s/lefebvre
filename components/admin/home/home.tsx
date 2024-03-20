"use client";

import { adminTabs } from "@/config/const";
import { TabData } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeScreen = () => {
  const path = usePathname();

  return (
    <main className="w-full h-full bg-white overflow-auto p-10">
      <main className="w-full h-auto grid justify-center items-center  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-6">
        {adminTabs.map(({ icon: Icon, ...info }: TabData, index: number) => {
          return (
            <Link
              key={index}
              href={info.link}
              prefetch={false}
              className={`w-full h-[220px] flex flex-row md:flex-col justify-evenly items-center p-2 ${
                path === info.link && "ring-1"
              } bg-white shadow-md  cursor-pointer rounded-lg hover:ring-1 hover:ring-theme`}>
              <div className="p-6 bg-blue-50 rounded-full">
                <Icon className="text-theme text-[40px]" />
              </div>
              <p className="text-theme font-bold">{info.label}</p>
            </Link>
          );
        })}
      </main>
    </main>
  );
};

export default HomeScreen;
