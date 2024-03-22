"use client";

import classNames from "classnames";
import React, { useState, useMemo } from "react";

import { Button } from "../ui/button";
import Image from "next/image";
import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { GiThermometerScale } from "react-icons/gi";
import { IoCalendar } from "react-icons/io5";
import { GiCoffeeCup } from "react-icons/gi";
import {
  FaUsers,
  FaCogs,
  FaUserCog,
  FaAngleDoubleLeft,
  FaUsersCog,
} from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";

import { TabData } from "@/types/index";
import SideBarTabs from "./sidebar-tabs";
import UserCard from "./user-card";
import { adminTabs } from "@/config/const";
import { Ghost } from "lucide-react";
import Link from "next/link";

const SideBar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const wrapperClasses = classNames(
    "h-screen px-4 pt-2 pb-4 bg-new hidden justify-start flex-col lg:flex overflow-auto ",
    {
      ["w-80"]: !toggleCollapse,
      "w-[85px]": toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-theme absolute right-0 hover:bg-secondary",
    {
      "rotate-180": toggleCollapse,
      "rotate-0": !toggleCollapse,
    }
  );

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}>
      {/* <div className="flex flex-col h-[80px] border-b-2 border-theme">
        <div className="w-full h-[60px] flex items-center justify-between relative">
          {!toggleCollapse ? (
            <div className="w-[220px] h-[40px] mt-[-30px] ml-3">
              <Image
                width={300}
                height={300}
                src="/lefebvre-logo.png"
                alt="LEFEBVRE"
                className="object-contain  "
              />
            </div>
          ) : (
            <div className="w-[200px] h-[40px]">
              <Image
                src="/lefebvre-icon.png"
                alt="LEFEBVRE"
                fill
                className="object-contain  "
              />
            </div>
          )}
          {isCollapsible && (
            <Button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}>
              <FaAngleDoubleLeft className="text-theme" />
            </Button>
          )}
        </div>
      </div> */}
      {/* <div
        className={`w-full h-[200px] bg-red hidden ${
          toggleCollapse ? "md:hidden" : "md:flex"
        } pt-2 `}>
        <UserCard />
      </div> */}

      <div
        className={`w-full flex justify-end items-center  ml-auto mb-2 ${
          toggleCollapse ? "rotate-180 " : "rotate-0"
        }`}>
        <Button
          variant={"secondary"}
          className="p-5"
          onClick={handleSidebarToggle}>
          <FaAngleDoubleLeft className="text-theme" />
        </Button>
      </div>
      <Link href={"/"} className="w-full p-[2px] bg-theme rounded-sm ">
        {!toggleCollapse ? (
          <Image
            width={300}
            height={300}
            src="/lefebvre-logo.png"
            alt="LEFEBVRE"
            className="object-contain rounded-sm "
          />
        ) : (
          <Image
            src="/lefebvre-icon.png"
            alt="LEFEBVRE"
            width={100}
            height={100}
            className="object-contain rounded-sm "
          />
        )}
      </Link>

      <SideBarTabs
        isToggles={toggleCollapse}
        tabs={adminTabs}
        onMouseOver={() => setIsCollapsible(isCollapsible)}
      />
    </div>
  );
};

export default SideBar;
