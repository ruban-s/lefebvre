import { TabData } from "@/types";
import {
  FaCogs,
  FaHome,
  FaUserCog,
  FaUsersCog,
  FaUsers,
  FaBusinessTime,
  FaIdCardAlt,
} from "react-icons/fa";
import { GiCoffeeCup, GiThermometerScale } from "react-icons/gi";
import { IoCalendar } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { CgWorkAlt } from "react-icons/cg";
import { FaClipboardList } from "react-icons/fa";
import { TbLockExclamation, TbLockCheck, TbLockCancel } from "react-icons/tb";
import { TiCancelOutline } from "react-icons/ti";
import { IoCloseCircle } from "react-icons/io5";

export const BASE_URL = "http://208.109.9.243:8082";
export const adminTabs: TabData[] = [
  { id: 1, label: "Home", icon: FaHome, link: "/" },
  { id: 2, label: "Dashboard", icon: MdSpaceDashboard, link: "/dashboard" },
  { id: 3, label: "Measures", icon: GiThermometerScale, link: "/measures" },
  {
    id: 4,
    label: "Shift",
    icon: FaBusinessTime,
    link: "/shift",
    child: true,
    childLink: [
      { id: 2, label: "Shift", icon: FaBusinessTime, link: "/shift" },
      {
        id: 2,
        label: "Shift Employee",
        icon: MdSpaceDashboard,
        link: "/shift-employee",
      },
    ],
  },
  { id: 5, label: "Employees", icon: FaUsersCog, link: "/employees" },
  { id: 6, label: "Attendance", icon: IoCalendar, link: "/attendance" },
  { id: 7, label: "Break", icon: GiCoffeeCup, link: "/break" },
  { id: 8, label: "Indirect-code", icon: FaCogs, link: "/indirect-code" },
  { id: 9, label: "Resources", icon: FaUserCog, link: "/resources" },
  { id: 10, label: "Users", icon: FaUsers, link: "/user" },
  { id: 11, label: "Report", icon: TbReportAnalytics, link: "/report" },
];
export const plannerTabs: TabData[] = [
  { id: 1, label: "Home", icon: FaHome, link: "/" },
  { id: 1, label: "Project", icon: MdSpaceDashboard, link: "/planner/project" },
  {
    id: 2,
    label: "Work Order",
    icon: CgWorkAlt,
    link: "/planner/work-order",
  },
  {
    id: 3,
    label: "Resource Work Order",
    icon: FaClipboardList,
    link: "/planner/resource-work-order",
  },
  {
    id: 4,
    label: "Closed Project",
    icon: TbLockCancel,
    link: "/planner/closed-project",
  },
  {
    id: 5,
    label: "Unreleased Project",
    icon: TbLockExclamation,
    link: "/planner/unreleased-project",
  },
  {
    id: 6,
    label: "Released Project",
    icon: TbLockCheck,
    link: "/planner/released-project",
  },
];
export const productionTabs: TabData[] = [
  { id: 1, label: "Home", icon: FaHome, link: "/" },
  {
    id: 1,
    label: "Project",
    icon: MdSpaceDashboard,
    link: "/production/project",
  },
  {
    id: 2,
    label: "Work Order",
    icon: CgWorkAlt,
    link: "/production/work-order",
  },
  {
    id: 3,
    label: "Resource Work Order",
    icon: FaClipboardList,
    link: "/production/resource-work-order",
  },
  {
    id: 4,
    label: "Closed Project",
    icon: TbLockCancel,
    link: "/production/closed-project",
  },
  {
    id: 5,
    label: "Unreleased Project",
    icon: TbLockExclamation,
    link: "/production/unreleased-project",
  },
  {
    id: 6,
    label: "Released Project",
    icon: TbLockCheck,
    link: "/production/released-project",
  },
  {
    id: 7,
    label: "Labour Card Maintenance",
    icon: FaIdCardAlt,
    link: "/production/labour-card",
  },
];
export const SuperAdminTabs: TabData[] = [
  { id: 1, label: "Home", icon: FaHome, link: "/" },
  {
    id: 2,
    label: "Project",
    icon: MdSpaceDashboard,
    link: "/super-admin/project",
  },
  {
    id: 3,
    label: "Work Order",
    icon: CgWorkAlt,
    link: "/super-admin/work-order",
  },
  {
    id: 4,
    label: "Resource Work Order",
    icon: FaClipboardList,
    link: "/super-admin/resource-work-order",
  },
  {
    id: 5,
    label: "Canceled Details",
    icon: TiCancelOutline,
    link: "/super-admin/canceled-details",
  },
  {
    id: 6,
    label: "Closed Details",
    icon: IoCloseCircle,
    link: "/super-admin/closed-details",
  },
  {
    id: 7,
    label: "Labour Card",
    icon: FaClipboardList,
    link: "/super-admin/labour-card",
  },
];

export const attendanceTypeController = [
  "createdDate",
  "name",
  "status",
  "type",
  "updatedDate",
];
export const breakController = [
  "createdDate",
  "end_time",
  "name",
  "shift_id",
  "shift_name",
  "start_time",
  "status",
  "updatedDate",
];
export const employeeController = [
  "createdDate",
  "current_shift_id",
  "current_shift_name",
  "designation_id",
  "email",
  "employee_id",
  "first_name",
  "gender",
  "last_name",
  "mobile",
  "role_name",
  "status",
  "updatedDate",
];

export const indirectController = [
  "createdDate",
  "description",

  "indirectCode",
  "name",
  "status",
  "updatedDate",
];
export const projectController = [
  "actualHour",
  "createdDate",
  "customer_name",
  "description",
  "end_date",
  "estimateHour",

  "planner_remark",
  "production_remark",
  "project_id",
  "start_date",
  "status",
  "updatedDate",
];

export const resourceController = [
  "actual_hour",
  "ballance_hour",
  "ballanced_quantity",
  "bench_mark_measure",
  "bench_mark_unit",
  "createdDate",
  "employee_id",
  "endDate",
  "estimated_hour",
  "forman",

  "prepared_quantity",
  "project_id",
  "quantity_unit",
  "remark",
  "required_quantity",
  "resourceId",
  "sqNumber",
  "startDate",
  "status",
  "updatedDate",
  "work_order_id",
];
export const shiftController = [
  "createdDate",
  "employee_id",

  "shift_end_time",
  "shift_name",
  "shift_start_time",
  "shift_type",
  "status",
  "updatedDate",
];

export const measuresController = [
  "createdDate",

  "status",
  "unit",
  "updatedBy",
  "updatedDate",
];

export const userController = [
  "createdDate",
  "email",

  "mobile",
  "name",
  "password",
  "role_name",
  "status",
  "token",
  "updatedDate",
  "username",
];

export const workOrderController = [
  "actualHour",
  "createdDate",
  "description",
  "end_date",
  "estimateHour",

  "planner_remark",
  "production_remark",
  "project_id",
  "role_id",
  "start_date",
  "status",
  "updatedDate",
  "work_order_id",
];

export const resourceAdmincontroller = [
  "attachment",
  "createdDate",

  "res_description",
  "res_note",
  "res_status",
  "resource_id",
  "sq_number",
  "status",
  "updatedDate",
];
