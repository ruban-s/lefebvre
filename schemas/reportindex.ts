import { z } from "zod";

export const WorkOrderReportSchema = z.object({
  status: z.string().min(1, { message: "Status is Required" }),
  project_id: z.string().min(1, { message: "ProjectId is Required" }),
});
