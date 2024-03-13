"use client";

import classNames from "classnames";
import React, { useState, useMemo } from "react";

import { Button } from "../ui/button";
import Image from "next/image";
import { IconType } from "react-icons";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { GiThermometerScale } from "react-icons/gi";
import { FaUsersCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { GiCoffeeCup } from "react-icons/gi";
import { FaCogs } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";

import { TabData } from "@/types/index";
import SideBarTabs from "./sidebar-tabs";
import UserCard from "./user-card";

// interface TabData {
//   id: number;
//   label: string;
//   icon: IconType;
//   link: string;
// }

const SideBar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const adminTabs: TabData[] = [
    { id: 1, label: "Home", icon: FaHome, link: "/" },
    { id: 1, label: "Dashboard", icon: MdSpaceDashboard, link: "/dashboard" },
    { id: 2, label: "Measures", icon: GiThermometerScale, link: "/measures" },
    { id: 3, label: "Employees", icon: FaUsersCog, link: "/employees" },
    { id: 4, label: "Attendance", icon: IoCalendar, link: "/attendance" },
    { id: 5, label: "Break", icon: GiCoffeeCup, link: "/break" },
    { id: 6, label: "Indirect-code", icon: FaCogs, link: "/indirect-code" },
    { id: 7, label: "Resources", icon: FaUserCog, link: "/resources" },
    { id: 8, label: "Users", icon: FaUsers, link: "/user" },
    { id: 9, label: "Report", icon: TbReportAnalytics, link: "/report" },
  ];

  const wrapperClasses = classNames(
    "h-screen px-4 pt-2 pb-4 bg-light flex justify-start flex-col ",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-secondary absolute right-0 hover:bg-secondary",
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
      <div className="flex flex-col h-[80px] border-b-2 border-theme">
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
      </div>
      {/* <div
        className={`w-full h-[200px] bg-red hidden ${
          toggleCollapse ? "md:hidden" : "md:flex"
        } pt-2 `}>
        <UserCard />
      </div> */}

      <SideBarTabs
        isToggles={toggleCollapse}
        tabs={adminTabs}
        onMouseOver={() => setIsCollapsible(isCollapsible)}
      />
    </div>
  );
};

export default SideBar;
