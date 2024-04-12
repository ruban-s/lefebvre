/* trunk-ignore-all(prettier) */
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
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

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
      {tabs?.map(({ icon: Icon, ...value }, index: number) => {
        if (value.child) {
          return (
            <Popover>
              <PopoverTrigger className="w-full hover-none">
                <div
                  key={index}
                  style={{
                    transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s",
                  }}
                  className={`w-full flex justify-start items-center  cursor-pointer  mb-1 p-4 rounded-md ${
                    path === "/shift" &&
                    "bg-theme border-spacing-1 border-2 border-theme"
                  }
                   ${
                     path === "/shift-employee" &&
                     "bg-theme border-spacing-1 border-2 border-theme"
                   } ${
                    path !== "/shift" && "hover:bg-neutral-200 border-b-[1px]"
                  }${
                    path !== "/shift-employee" &&
                    "hover:bg-neutral-200 border-b-[1px]"
                  }`}>
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="flex  justify-start items-center mr-4  ">
                        <Icon
                          size={20}
                          className={` ${
                            path === "/shift" ? "text-white" : "text-theme"
                          }  ${
                            path === "/shift-employee"
                              ? "text-white"
                              : "text-theme"
                          }`}
                        />
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                  {!isToggles && (
                    <p
                      className={` ${
                        path === "/shift" ? "text-white" : "text-theme"
                      }
                      ${
                        path === "/shift-employee" ? "text-white" : "text-theme"
                      }
                          ml-4  font-medium`}>
                      {value.label}
                    </p>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent>
                {value.childLink &&
                  value.childLink.map((info, childIndex) => {
                    return (
                      <PopoverClose key={childIndex} className="w-full" asChild>
                        <Link
                          style={{
                            transition:
                              "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s",
                          }}
                          href={info.link}
                          className={`w-full flex justify-start items-center  cursor-pointer  mb-1 p-4 rounded-md ${
                            path === info.link &&
                            "bg-theme border-spacing-1 border-2 border-theme"
                          } ${
                            path !== info.link &&
                            "hover:bg-neutral-200 border-b-[1px]"
                          }`}>
                          <TooltipProvider>
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger className="flex  justify-start items-center mr-4  ">
                                <Icon
                                  size={20}
                                  className={`${
                                    path == info.link
                                      ? "text-white"
                                      : "text-theme"
                                  }`}
                                />
                              </TooltipTrigger>
                              <TooltipContent align="end">
                                <p className="text-theme font-bold">
                                  {info.label}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {!isToggles && (
                            <p
                              className={`${
                                path == info.link ? "text-white" : "text-theme"
                              } ml-4  font-medium`}>
                              {info.label}
                            </p>
                          )}
                        </Link>
                      </PopoverClose>
                    );
                  })}
              </PopoverContent>
            </Popover>
          );
        }
        return (
          <Link
            key={index}
            style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
            href={value.link}
            className={`w-full flex justify-start items-center  cursor-pointer  mb-1 p-4 rounded-md ${
              path === value.link &&
              "bg-theme border-spacing-1 border-2 border-theme"
            } ${path !== value.link && "hover:bg-neutral-200 border-b-[1px]"}`}>
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="flex  justify-start items-center mr-4  ">
                  <Icon
                    size={20}
                    className={`${
                      path === value.link ? "text-white" : "text-theme"
                    }`}
                  />
                </TooltipTrigger>
                <TooltipContent align="end">
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
