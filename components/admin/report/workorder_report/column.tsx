"use client";
import StatusBadge from "@/components/common/status-badge";
import { WorkOrderDataReport } from "@/types";
import { statuses } from "@/types/filter";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<WorkOrderDataReport>[] = [
  {
    accessorKey: "project_id",
    header: "ProjectId",
  },
  {
    accessorKey: "customer_name",
    header: "Name",
  },
  {
    accessorKey: "work_order_Id",
    header: "WorkOrderId",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "start_date",
    header: "StartDate",
  },
  {
    accessorKey: "end_date",
    header: "EndDate",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return <StatusBadge row={row} />;
    },
  },
];
