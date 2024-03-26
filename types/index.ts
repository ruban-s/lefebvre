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
  name: string;
  updatedDate: string;
}
