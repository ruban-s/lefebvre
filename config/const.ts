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
import {
  MdBatteryChargingFull,
  MdManageAccounts,
  MdOutlineSummarize,
  MdSpaceDashboard,
  MdWork,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { CgSandClock, CgWorkAlt } from "react-icons/cg";
import { FaClipboardList } from "react-icons/fa";
import { TbLockExclamation, TbLockCheck, TbLockCancel } from "react-icons/tb";
import { TiCancelOutline } from "react-icons/ti";
import { IoCloseCircle } from "react-icons/io5";
import { GrResources, GrUserManager } from "react-icons/gr";
import { FaTicket } from "react-icons/fa6";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsLightningChargeFill } from "react-icons/bs";

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
  {
    id: 8,
    label: "Report",
    icon: TbReportAnalytics,
    link: "/production/report",
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
export const ReportTabs: TabData[] = [
  {
    id: 1,
    label: "Project Summary",
    icon: MdOutlineSummarize,
    link: "/production/report/project_summary",
  },
  {
    id: 2,
    label: "Workorder Report",
    icon: MdWork,
    link: "/production/report/workorder_report",
  },
  {
    id: 3,
    label: "Resource Report",
    icon: GrResources,
    link: "/production/report/resource_report",
  },
  {
    id: 4,
    label: "Labour Ticket Report",
    icon: FaTicket,
    link: "/production/report/labour_ticket_report",
  },
  {
    id: 5,
    label: "Foreman Report",
    icon: GrUserManager,
    link: "/production/report/foreman_report",
  },
  {
    id: 6,
    label: "Need to Fill",
    icon: GrUserManager,
    link: "/production/report/foreman_report",
  },
  {
    id: 7,
    label: "Hours To Complete",
    icon: CgSandClock,
    link: "/production/report/hours_to_complete",
  },
  {
    id: 8,
    label: "Capacity Utilisation",
    icon: MdBatteryChargingFull,
    link: "/production/report/capacity_utilisation",
  },
  {
    id: 9,
    label: "Employee Efficiency",
    icon: BsLightningChargeFill,
    link: "/production/report/employee_efficiency",
  },
  {
    id: 10,
    label: "Indirect Report",
    icon: HiOutlineDocumentReport,
    link: "/production/report/indirect_report",
  },
  {
    id: 11,
    label: "Employee",
    icon: MdManageAccounts,
    link: "/production/report/employee",
  },
  {
    id: 12,
    label: "Need to Fill",
    icon: GrUserManager,
    link: "/production/report/foreman_report",
  },
];

export const attendanceTypeController = [
  "name",
  "status",
  "type",
  "updatedDate",
  "createdDate",
];
export const breakController = [
  "name",
  "shift_id",
  "shift_name",
  "start_time",
  "end_time",
  "status",
  "updatedDate",
  "createdDate",
];
export const employeeController = [
  "employee_id",
  "first_name",
  "last_name",
  "designation_id",
  "current_shift_id",
  "current_shift_name",
  "email",
  "gender",
  "mobile",
  "role_name",
  "status",
  "updatedDate",
  "createdDate",
];

export const indirectController = [
  "GL CODE",
  "indirectID",
  "description",
  "status",
  "updatedDate",
  "createdDate",
];
export const projectController = [
  "project_id",
  "customer_name",
  "description",
  "estimateHour",
  "actualHour",
  "start_date",
  "end_date",
  "planner_remark",
  "production_remark",
  "status",
  "updatedDate",
  "createdDate",
];

export const resourceController = [
  "project_id",
  "work_order_id",
  "sqNumber",
  "resourceId",
  "estimated_hour",
  "ballance_hour",
  "ballanced_quantity",
  "bench_mark_measure",
  "bench_mark_unit",
  "startDate",
  "endDate",
  "actual_hour",
  "required_quantity",
  "prepared_quantity",
  "quantity_unit",
  "employee_id",
  "employee_id",
  "remark",
  "forman",
  "status",
  "createdDate",
  "updatedDate",
];
export const shiftController = [
  "employee_id",
  "designation_id",
  "shift_name",
  "shift_type",
  "shift_start_time",
  "shift_end_time",
  "status",
  "createdDate",
  "updatedDate",
];

export const measuresController = [
  "unit",
  "updatedBy",
  "status",
  "createdDate",
  "updatedDate",
];

export const userController = [
  "username",
  "name",
  "password",
  "email",
  "mobile",
  "role_name",
  "status",
  "token",
  "createdDate",
  "updatedDate",
];

export const workOrderController = [
  "project_id",
  "work_order_id",
  "description",
  "estimateHour",
  "actualHour",
  "start_date",
  "end_date",
  "planner_remark",
  "production_remark",
  "role_id",
  "status",
  "createdDate",
  "updatedDate",
];

export const resourceAdmincontroller = [
  "resource_id",
  "res_description",
  "res_note",
  // "res_status",
  "status",
  "attachment",
  "createdDate",
  "updatedDate",
];

export const labourCardMaintanceField = [
  "id",
  "employee_id",
  "name",
  "designation_id",
  "attendance_type",
  "gl_code",
  "project_id",
  "work_order_id",
  "resource_id",
  "sq_no",
  "punch_in_time",
  "punch_out_time",
  "system_in_time",
  "system_out_time",
  "work_hours",
  "break_duration",
  "effective_work_hour",
  "effective_work_hour_format",
  "prepared_quantity",
  "shift_start_time",
  "shift_end_time",
  "shift_date",
  "forman_id",
  "changed_resource",
  "remark",
  "createdDate",
  "updatedDate",
];

export const ProjectSummaryController = [
  "projectId",
  "description",
  "customer_name",
  "status",
  "start_date",
  "end_date",
  "estimated_hour",
  "actual_hour",
  "variance",
  "total_work_order",
  "released_work_order",
  "unreleased_work_order",
  "closed_work_order",
];

export const workOrderDataReportController = [
  "project_id",
  "description",
  "customer_name",
  "work_order_Id",
  "work_order_description",
  "status",
  "start_date",
  "end_date",
  "estimated_hour",
  "actual_hour",
  "variance",
  "required_quantity",
  "prepared_quantity",
];

export const ResourceReportController = [
  "project_id",
  "description",
  "customer_name",
  "work_order_Id",
  "work_order_description",
  "sq_no",
  "resource_id",
  "bench_mark_measure",
  "bench_mark_unit",
  "estimated_hour",
  "actual_hour",
  "variance",
  "required_quantity",
  "prepared_quantity",
  "unit_measure",
  "forman",
  "status",
];

export const FormanReportController = [
  "forman_id",
  "forman_name",
  "project_id",
  "description",
  "customer_name",
  "work_order_Id",
  "work_order_description",
  "sq_no",
  "resource_id",
  "bench_mark_measure",
  "bench_mark_unit",
  "estimated_hour",
  "actual_hour",
  "variance",
  "required_quantity",
  "prepared_quantity",
  "unit_measure",
  "efficiency",
  "status",
];

export const CapacityUtilisationController = [
  "resource_id",
  "project_id",
  "description",
  "customer_name",
  "work_order_Id",
  "work_order_description",
  "estimated_hour",
  "actual_hour",
  "balance_hour_to_complete",
  "required_quantity",
  "prepared_quantity",
  "balance_quantity",
  "end_date",
  "status",
];

export const EmployeeEfficiencyController = [
  "employee_id",
  "employee_name",
  "designation",
  "project_id",
  "project_description",
  "work_order_description",
  "resource_id",
  "estimated_hour",
  "actual_hour",
  "required_quantity",
  "prepared_quantity",
  "estimated_hrs_qty",
  "actula_hrs_qty",
  "efficiency",
];

export const EmployeeReportController = [
  "employee_id",
  "employee_name",
  "designation",
  "status",
  "team_leader",
];

export const IndirectReportController = [
  "date",
  "employee_id",
  "employee_name",
  "designation",
  "attendance_type",
  "type",
  "gl_code",
  "gl_description",
  "in_time",
  "out_time",
  "system_in_time",
  "system_out_time",
  "work_hours",
  "break_hours",
  "effective_work_hours",
  "effective_work_hour_forman",
];

export const LabourTicketController = [
  "transaction_id",
  "employee_id",
  "employee_name",
  "designation",
  "attendance_type",
  "type",
  "gl_code",
  "gl_description",
  "project_id",
  "work_order_id",
  "sq_no",
  "resource_id",
  "in_time",
  "out_time",
  "system_in_time",
  "system_out_time",
  "work_hours",
  "break_hours",
  "effective_work_hours",
  "effective_work_hour_forman",
  "prepared_quantity",
  "shift_start_time",
  "shift_end_time",
  "shift_date",
  "forman",
  "forman_name",
  "remark_by_forman",
];
