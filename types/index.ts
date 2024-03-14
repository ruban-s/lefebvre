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
