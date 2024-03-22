import * as z from "zod";
export const LoginSchema = z.object({
  username: z.string().min(1, { message: "username is required" }),
  password: z.string().min(1, { message: "password is required" }),
});
export const BreakSchema = z.object({
  name: z.string().min(1, { message: "break name is required" }),
  status: z.string().min(1, { message: "status is required" }),
  start_time: z.string().min(1, { message: "start time is required" }),
  end_time: z.string().min(1, { message: "end time is required" }),
});
export const UserSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  username: z.string().min(1, { message: "username is required" }),
  email: z.string().min(1, { message: "email is required" }),
  image: z.string().optional(),
  password: z.string().min(1, { message: "password is required" }),
  mobile: z.string().min(1, { message: "mobile number is required" }),
  role_name: z.string().min(1, { message: "Choose a role. " }),
  status: z.string().min(1, { message: "status is required" }),
  token: z.string().default(" "),
});
export const IndirectCodeSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  status: z.string().min(1, { message: "status is required" }),
  indirectCode: z.string().min(1, { message: "indirect-ID is required" }),
  description: z.string().optional(),
});
export const ResourceSchema = z.object({
  resource_id: z.string().min(1, { message: "name is required" }),
  status: z.string().min(1, { message: "status is required" }),
  res_description: z.string().optional().default("--"),
  res_note: z.string().optional().default("--"),
});

export const EmployeeSchema = z.object({
  designation_id: z.string().min(1, { message: "designation_id is required" }),
  image_path: z.string().optional(),
  email: z.string().min(1, { message: "email is required" }),
  employee_id: z.string().min(1, { message: "employee_id is required" }),
  first_name: z.string().min(1, { message: "first_name is required" }),
  gender: z.string().min(1, { message: "gender is required" }),
  last_name: z.string().min(1, { message: "last_name is required" }),
  mobile: z.string().min(1, { message: "mobile is required" }),
  status: z.string().min(1, { message: "status is required" }),
});
export const MeasureSchema = z.object({
  unit: z.string().min(1, { message: "unit is required" }),
  status: z.string().min(1, { message: "status is required" }),
});
export const AttendanceTypeSchema = z.object({
  name: z.string().min(1, { message: "Attendance type is required" }),
  status: z.string().min(1, { message: "status is required" }),
});
