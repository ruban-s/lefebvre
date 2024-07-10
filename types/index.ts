import { IconType } from "react-icons";

export interface TabData {
  id: number;
  label: string;
  icon: IconType;
  child?: boolean;
  childLink?: TabData[];
  link: string;
}
export interface ResponseData {
  status: boolean;
  message: string;
  data: string;
}
export interface BreaksData {
  createdDate: string;
  end_time: string;
  id: string;
  name: string;
  start_time: string;
  status: string;
  shift_id: string;
  shift_name: string;
  updatedDate: string;
}
export interface UserData {
  createdDate: string;
  email: string;
  id: string;
  image: string;
  mobile: string;
  name: string;
  password: string;
  role_name: string;
  status: "Active" | "Inactive";
  token: string;
  updatedDate: string;
  username: string;
  edit: Function;
  access: string;
}
export interface IndirectCodeData {
  createdDate: string;
  description: string;
  id: string;
  name: string;
  status: string;
  indirectCode: string;
  updatedDate: string;
}
export interface ResourceData {
  createdDate: string;
  id: string;
  res_description: string;
  res_note: string;
  res_status: string;
  resource_id: string;
  sq_number: string;
  status: string;
  updatedDate: string;
}
export interface EmployeeData {
  createdDate: string;
  designation_id: string;
  email: string;
  employee_id: string;
  first_name: string;
  forman: string;
  gender: string;
  id: string;
  image_path: string;
  last_name: string;
  mobile: string;
  role_name: string;
  status: string;
  current_shift_id: string;
  current_shift_name: string;
  previous_shift_id: string;
  previous_shift_name: string;
  updatedDate: string;
}
export interface MeasureData {
  createdDate: string;
  id: string;
  status: string;
  unit: string;
  updatedBy: string;
  updatedDate: string;
}
export interface AttendanceTypeData {
  createdDate: string;
  id: string;
  status: string;
  type: string;
  name: string;
  updatedDate: string;
}

export interface ProjectData {
  actualHour: string;
  createdDate: string;
  customer_name: string;
  description: string;
  end_date: string;
  estimateHour: string;
  requiredQuantity: string;
  preparedQuantity: string;
  id: string;
  images: string[];
  planner_remark: string;
  production_remark: string;
  project_id: string;
  start_date: string;
  status: string;
  updatedDate: string;
}
export interface WorkOrderData {
  actualHour: string;
  createdDate: string;
  description: string;
  end_date: string;
  estimateHour: string;
  id: string;
  images: string[];
  planner_remark: string;
  production_remark: string;
  requiredQuantity: string;
  preparedQuantity: string;
  project_id: string;
  role_id: string;
  start_date: string;
  status: string;
  updatedDate: string;
  work_order_id: string;
}

export interface ResourceWorkOdderData {
  actual_hour: string;
  ballance_hour: string;
  ballanced_quantity: string;
  bench_mark_measure: string;
  bench_mark_unit: string;
  createdDate: string;
  employee_id: string;
  endDate: string;
  estimated_hour: string;
  forman: string[];
  attachment: attachment[];
  id: string;
  prepared_quantity: string;
  project_id: string;
  quantity_unit: string;
  production_remark: string;
  remark: string;
  required_quantity: string;
  resourceId: string;
  roleName: string;
  sqNumber: string;
  startDate: string;
  status: string;
  updatedDate: string;
  work_order_id: string;
}
export interface ShiftData {
  createdDate: string;
  employee_id: string;
  forman_id: string;
  id: string;
  shift_end_time: string;
  shift_name: string;
  shift_start_time: string;
  shift_type: string;
  status: string;
  updatedDate: string;
}
export interface attachment {
  attachment: string[];
  forman: string;
}
export interface LabourData {
  attendance_type: string;
  break_type: string;
  createdDate: string;
  designation_id: string;
  employee_id: string;
  forman: string;
  gl_code: string;
  gl_description: string;
  id: string;
  image_path: string;
  labor_id: string;
  labor_type_id: string;
  name: string;
  project_id: string;
  is_production_editable: boolean;
  is_super_admin_editable: boolean;
  punch_in_time: string;
  punch_out_time: string;
  quantity: string;
  remark: string;
  resource_id: string;
  shift_end_time: string;
  shift_start_time: string;
  status: string;
  updatedDate: string;
  work_order_id: string;
}

// Reports
export interface ProjectSummary {
  projectId: string;
  description: string;
  customer_name: string;
  status: string;
  start_date: string;
  end_date: string;
  estimated_hour: string;
  actual_hour: string;
  variance: string;
  total_work_order: string;
  closed_work_order: string;
  released_work_order: string;
  unreleased_work_order: string;
}

export interface WorkOrderDataReport {
  project_id: string;
  description: string;
  customer_name: string;
  work_order_Id: string;
  work_order_description: string;
  start_date: string;
  end_date: string;
  estimated_hour: string;
  actual_hour: string;
  variance: string;
  required_quantity: string;
  prepared_quantity: string;
  status: string;
}

export interface ResourceReport {
  project_id: string;
  description: string;
  customer_name: string;
  work_order_Id: string;
  work_order_description: string;
  sq_no: string;
  resource_id: string;
  bench_mark_measure: string;
  bench_mark_unit: string;
  estimated_hour: string;
  actual_hour: string;
  variance: string;
  required_quantity: string;
  prepared_quantity: string;
  unit_measure: string;
  forman: string;
  status: string;
}

export interface FormanReport {
  forman_id: number;
  forman_name: string;
  project_id: string;
  description: string;
  customer_name: string;
  work_order_Id: string;
  work_order_description: string;
  sq_no: number;
  resource_id: string;
  bench_mark_measure: number;
  bench_mark_unit: string;
  estimated_hour: string;
  actual_hour: string | null;
  variance: number;
  required_quantity: number;
  prepared_quantity: number | null;
  unit_measure: string;
  efficiency: number;
  status: string;
}

export interface CapacityUtilisation {
  resource_id: string;
  project_id: string;
  description: string;
  customer_name: string;
  work_order_Id: string;
  work_order_description: string;
  estimated_hour: string;
  actual_hour: string;
  balance_hour_to_complete: string;
  required_quantity: string;
  prepared_quantity: string;
  balance_quantity: string;
  end_date: string;
  status: string;
}

export interface EmployeeEfficiency {
  employee_id: string;
  employee_name: string;
  designation: string;
  project_id: string;
  project_description: string;
  work_order_description: string;
  resource_id: string;
  estimated_hour: string;
  actual_hour: string;
  required_quantity: string;
  prepared_quantity: string;
  estimated_hrs_qty: string;
  actula_hrs_qty: string;
  efficiency: string;
}

export interface EmployeeReport {
  employee_id: string;
  employee_name: string;
  designation: string;
  status: string;
  team_leader: string;
}

export interface IndirectReport {
  date: string;
  employee_id: string;
  employee_name: string;
  designation: string;
  attendance_type: string;
  type: any;
  gl_code: any;
  gl_description: string;
  in_time: string;
  out_time: string | null;
  system_in_time: string;
  system_out_time: string;
  work_hours: string;
  break_hours: string;
  effective_work_hours: string;
  effective_work_hour_forman: string | null;
}

export interface LabourTicketReport {
  transaction_id: number;
  employee_id: string | null;
  employee_name: string;
  designation: string;
  attendance_type: string;
  type: string | null;
  gl_code: string | null;
  gl_description: string | null;
  project_id: string;
  work_order_id: string;
  sq_no: string | null;
  resource_id: string;
  in_time: string;
  out_time: string | null;
  system_in_time: string;
  system_out_time: string;
  work_hours: string;
  break_hours: string;
  effective_work_hours: string;
  effective_work_hour_forman: string | null;
  prepared_quantity: number | null;
  shift_start_time: string | null;
  shift_end_time: string | null;
  shift_date: string;
  forman: string | null;
  forman_name: string;
  remark_by_forman: string | null;
}
