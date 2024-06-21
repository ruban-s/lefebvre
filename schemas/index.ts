import { File } from "lucide-react";
import * as z from "zod";
export const LoginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
// --ADMIN--
export const BreakSchema = z.object({
  name: z.string().min(1, { message: "Break name is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  start_time: z.string().min(1, { message: "Start time is required" }),
  shift_id: z.string().optional(),
  shift_name: z.string().min(1, { message: "Shift Name is required" }),
  end_time: z.string().min(1, { message: "End time is required" }),
});
export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  image: z.string().optional(),
  password: z.string().min(1, { message: "Password is required" }),
  mobile: z.string().min(1, { message: "Mobile number is required" }),
  role_name: z.string().min(1, { message: "Choose a role. " }),
  status: z.string().min(1, { message: "Status is required" }),
  token: z.string().default(" "),
});
export const IndirectCodeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  indirectCode: z.string().min(1, { message: "Indirect-ID is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
export const ResourceSchema = z.object({
  resource_id: z.string().min(1, { message: "Resource ID is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  res_description: z.string().min(1, { message: "Description is required" }),
  res_note: z.string().optional(),
});
export const EmployeeSchema = z.object({
  designation_id: z.string().min(1, { message: "Designation_id is required" }),
  image_path: z.string().optional(),
  email: z.string().optional(),
  employee_id: z.string().min(1, { message: "Employee id is required" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  gender: z.string().optional(),
  last_name: z.string().min(1, { message: "Last name is required" }),
  mobile: z.string().optional(),
  status: z.string().min(1, { message: "Status is required" }),
  current_shift_id: z.string().optional(),
  current_shift_name: z.string().optional(),
  previous_shift_id: z.string().optional(),
  previous_shift_name: z.string().optional(),
});
export const MeasureSchema = z.object({
  unit: z.string().min(1, { message: "Unit is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});
export const AttendanceTypeSchema = z.object({
  name: z.string().min(1, { message: "Attendance type is required" }),
  type: z.string().min(1, { message: "Type type is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});
// --PLANNER--
export const ProjectSchema = z.object({
  actualHour: z.string().optional(),
  customer_name: z.string().min(1, { message: "Customer Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  estimateHour: z.string().optional(),
  images: z.array(z.string().optional()).optional(),
  planner_remark: z.string().optional(),
  production_remark: z.string().optional(),
  requiredQuantity: z.string().optional(),
  project_id: z.string().min(1, { message: "Project ID is required" }),
  start_date: z
    .string()
    .min(1, { message: "Start Date and End Date are required" }),
  end_date: z.string().optional(),
  status: z.string().min(1, { message: "status is required" }),
});
export const WorkOrderSchema = z.object({
  actualHour: z.string().optional(),
  work_order_id: z.string().min(1, { message: "Work Order Id is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  estimateHour: z.string().optional(),
  images: z.array(z.string().optional()).optional(),
  planner_remark: z.string().optional(),
  production_remark: z.string().optional(),
  project_id: z.string().min(1, { message: "Project ID is required" }),
  start_date: z
    .string()
    .min(1, { message: "Start Date and End Date are required" }),
  end_date: z.string().optional(),

  status: z.string().min(1, { message: "status is required" }),
});
export const ResourceWorkOrderSchema = z.object({
  estimated_hour: z.string().refine((arg) => {
    console.log(arg);
    const regex = /^\d{1,4}[:.][0-5]?[0-9]$/;
    return regex.test(arg);
  }),
  bench_mark_measure: z.string().optional().default("--"),
  bench_mark_unit: z.string().optional().default("--"),
  quantity_unit: z.string().min(1, { message: "required!" }),
  remark: z.string().optional().default("--"),
  required_quantity: z.string().min(1, { message: "required!" }),
  sqNumber: z
    .string()
    .min(1, { message: "required!" })
    .refine(
      (val) => {
        const numberVal = parseInt(val);
        return numberVal % 10 === 0;
      },
      { message: "values: multiple of 10" }
    ),
  status: z.string().min(1, { message: "required!" }),
  ballance_hour: z.string().optional().default("--"),
  ballanced_quantity: z.string().optional().default("--"),
  production_remark: z.string().optional(),
  employee_id: z.string().optional().default("--"),
  endDate: z.string().optional().default("--"),
  actual_hour: z.string().optional().default("--"),
  forman: z.array(z.string().optional()).default([]),
  attachment: z.array(z.string().optional()).default([]),
  project_id: z.string().optional().default("--"),
  resourceId: z.string().optional().default("--"),
  prepared_quantity: z.string().optional().default("--"),
  startDate: z.string().optional().default("--"),
  work_order_id: z.string().optional().default("--"),
});
export const ResourceWorkOrderListSchema = z.object({
  project_id: z.string().optional(),
  work_order_id: z.string().optional(),
  resources: z.array(ResourceWorkOrderSchema).optional(),
});

export const ShiftSchema = z.object({
  createdDate: z.string().optional(),
  employee_id: z.string().optional(),
  forman_id: z.string().optional(),
  id: z.string().optional(),
  shift_end_time: z.string().min(1, { message: "Shift Time Required!" }),
  shift_name: z.string().min(1, { message: "Shift Time Required!" }),
  shift_start_time: z.string().min(1, { message: "Shift Time required!" }),
  shift_type: z.string().min(1, { message: "Shift Type required!" }),
  status: z.string().optional(),
  updatedDate: z.string().optional(),
});
