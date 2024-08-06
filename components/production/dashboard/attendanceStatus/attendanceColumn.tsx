"use client";

import { DashboardWorkersData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<DashboardWorkersData>[] = [
  {
    accessorKey: "employee_id",
    header: "Emp id",
  },
  {
    accessorKey: "name",
    header: "Emp name",
  },
  {
    accessorKey: "designation_id",
    header: "Designation ",
  },
];
