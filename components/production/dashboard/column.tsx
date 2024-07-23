import { LabourData } from "@/types";
import { jobPositions } from "@/types/filter";
import { ColumnDef } from "@tanstack/react-table";

export const Columns: ColumnDef<LabourData>[] = [
  {
    accessorKey: "employee_id",
    header: "Emp ID",
  },
  {
    accessorKey: "name",
    header: "Emp Name",
  },
  {
    accessorKey: "designation_id",
    header: "Designation ID",
    cell: ({ row }) => {
      const designationRowValue: string = row.getValue("designation_id");
      const designations = jobPositions.find(
        (designations) =>
          designations.value.toUpperCase().trim() ===
          designationRowValue.toUpperCase().trim()
      );

      if (!designations) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{designations.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const designationRowValue: string = row.getValue("designation_id");

      return value.includes(designationRowValue.toUpperCase().trim());
    },
  },
  {
    accessorKey: "gl_code",
    header: "Gl Code",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.gl_code ? "--" : <p>{row.original.gl_code}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: "work_order_id",
    header: "Work Order ID",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.work_order_id ? (
            "--"
          ) : (
            <p>{row.original.work_order_id}</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "resource_id",
    header: "Resource ID",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.resource_id ? "--" : <p>{row.original.resource_id}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: "punch_in_time",
    header: "Punch In",
  },
  {
    accessorKey: "punch_out_time",
    header: "Punch Out",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.punch_out_time ? (
            "--"
          ) : (
            <p>{row.original.punch_out_time}</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "effective_work_hour_format",
    header: "Total Hrs",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.effective_work_hour_format ? (
            "--"
          ) : (
            <p>{row.original.effective_work_hour_format}</p>
          )}
        </div>
      );
    },
  },
];
