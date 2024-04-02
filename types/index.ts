import { IconType } from "react-icons";

export interface TabData {
  id: number;
  label: string;
  icon: IconType;
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
  forman: string;
  id: string;
  prepared_quantity: string;
  project_id: string;
  quantity_unit: string;
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
