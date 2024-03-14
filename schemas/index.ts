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
