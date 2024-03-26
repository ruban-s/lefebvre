import { TabData } from "@/types";
import { FaCogs, FaHome, FaUserCog, FaUsersCog, FaUsers } from "react-icons/fa";
import { GiCoffeeCup, GiThermometerScale } from "react-icons/gi";
import { IoCalendar } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";

export const BASE_URL = "http://208.109.9.243:8082";
export const adminTabs: TabData[] = [
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
