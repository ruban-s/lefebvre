import { HoursConsumptionReport } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const Columns: ColumnDef<HoursConsumptionReport>[] = [
  {
    accessorKey: "work_order_id",
    header: "WorkOrder ID",
  },
  {
    accessorKey: "resource_id",
    header: "Resource ID",
  },
  {
    accessorKey: "seq_no",
    header: "Seq No",
  },
  {
    accessorKey: "consumption",
    header: "Consumption",
    cell: ({ row }) => {
      console.log(row.original);
      return <div>{row.original.consumption}</div>;
    },
  },
  {
    accessorKey: "unit_measure",
    header: "Unit",
  },
  {
    accessorKey: "required_qty",
    header: "Required Qty",
  },
  {
    accessorKey: "prepared_qty",
    header: "Prepared Qty",
  },
  {
    accessorKey: "balance_quantity",
    header: "Balance Qty",
  },
  {
    accessorKey: "estimated_hour",
    header: "Estimated Hrs",
  },
  {
    accessorKey: "actual_hour",
    header: "Actual Hrs",
  },
  {
    accessorKey: "variance",
    header: "Variance",
  },
  {
    accessorKey: "forman",
    header: "Foreman",
  },
];
