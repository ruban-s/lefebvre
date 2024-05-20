import { z } from "zod";

export const WorkOrderReportSchema = z.object({
  status: z.string().min(1, { message: "Status is Required" }),
  project_id: z.string().min(1, { message: "ProjectId is Required" }),
});

export const ResourceReportSchema = z.object({
  status: z.string().min(1, { message: "Status is Required" }),
  project_id: z.string().min(1, { message: "ProjectId is Required" }),
  work_order_Id: z.string().min(1, { message: "WorkOrderId is Required" }),
});

export const IndirectReportSchema = z.object({
  start_date: z
    .string()
    .min(1, { message: "Start Date and End Date is required" }),
  end_date: z.string().optional(),
});

export const LabourTicketReportSchema = z.object({
  start_date: z
    .string()
    .min(1, { message: "Start Date and End Date is required" }),
  end_date: z.string().optional(),
});
