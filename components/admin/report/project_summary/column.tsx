"use client";

import StatusBadge from "@/components/common/status-badge";
import { Badge } from "@/components/ui/badge";
import { ProjectSummary } from "@/types";
import { statuses } from "@/types/filter";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProjectSummary>[] = [
  {
    accessorKey: "projectId",
    header: "ProjectId",
  },
  {
    accessorKey: "customer_name",
    header: "Name",
  },
  {
    accessorKey: "estimated_hour",
    header: "EstimatedHour",
  },
  {
    accessorKey: "actual_hour",
    header: "ActualHour",
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
    accessorKey: "description",
    header: "Description",
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
