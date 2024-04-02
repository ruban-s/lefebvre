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
  resource_id: z.string().min(1, { message: "Name is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  res_description: z.string().min(1, { message: "Description is required" }),
  res_note: z.string().min(1, { message: "Note is required" }),
});
export const EmployeeSchema = z.object({
  designation_id: z.string().min(1, { message: "Designation_id is required" }),
  image_path: z.string().optional(),
  email: z.string().optional(),
  employee_id: z.string().min(1, { message: "Employee id is required" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  mobile: z.string().optional(),
  status: z.string().min(1, { message: "Status is required" }),
});
export const MeasureSchema = z.object({
  unit: z.string().min(1, { message: "Unit is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});
export const AttendanceTypeSchema = z.object({
  name: z.string().min(1, { message: "Attendance type is required" }),
  type: z.string().min(1, { message: "Type type is required" }),
  status: z.string().min(1, { message: "Atatus is required" }),
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
  actual_hour: z.string().min(1, { message: "Actual Hour is required!" }),
  // ballance_hour: z.string().optional(),
  // ballanced_quantity: z.string().optional(),
  bench_mark_measure: z
    .string()
    .min(1, { message: "Bench Mark Measure is required!" }),
  // bench_mark_unit: z.string().optional(),
  // employee_id: z.string().optional(),
  // endDate: z.string().optional(),
  // estimated_hour: z.string().optional(),
  // forman: z.string().optional(),
  prepared_quantity: z
    .string()
    .min(1, { message: "Quantity Unit is required!" }),
  project_id: z.string().optional(),
  // quantity_unit: z.string().min(1, { message: "Quantity Unit is required!" }),
  remark: z.string().min(1, { message: "Remark is required!" }),
  // required_quantity: z.string().optional(),
  resourceId: z.string().optional(),
  sqNumber: z.string().min(1, { message: "Sequence Number is required!" }),
  // startDate: z.string().optional(),
  status: z.string().optional(),
  work_order_id: z.string().optional(),
});
export const ResourceWorkOrderListSchema = z.object({
  project_id: z.string().optional(),
  work_order_id: z.string().optional(),
  resources: z.array(ResourceWorkOrderSchema).optional(),
});
