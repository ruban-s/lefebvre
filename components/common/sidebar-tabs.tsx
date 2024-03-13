"use client";
import React from "react";
import { TabData } from "@/types/index";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SideBarTabProps {
  isToggles: boolean;
  tabs: TabData[];
  onMouseOver: Function;
}

const SideBarTabs = (datas: SideBarTabProps) => {
  const { isToggles, tabs, onMouseOver } = datas;
  const path = usePathname();

  return (
    <div
      className="w-full h-auto mt-2"
      onMouseDown={onMouseOver()}
      onMouseLeave={onMouseOver()}>
      {tabs.map(({ icon: Icon, ...value }) => {
        return (
          <Link
            style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
            href={value.link}
            className={`w-full  flex justify-start items-center  cursor-pointer  mb-1 p-4 rounded-md ${
              path === value.link &&
              "bg-theme border-spacing-1 border-2 border-theme"
            } ${path !== value.link && "hover:bg-neutral-200 border-b-[1px]"}`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex  justify-start items-center  ">
                  <Icon
                    size={20}
                    className={`${
                      path === value.link ? "text-white" : "text-theme"
                    }`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-theme font-bold">{value.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {!isToggles && (
              <p
                className={`${
                  path === value.link ? "text-white" : "text-theme"
                } ml-4  font-medium`}>
                {value.label}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default SideBarTabs;
