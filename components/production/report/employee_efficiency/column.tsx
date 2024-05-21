"use client";

import { EmployeeEfficiency } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GrFormView } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Columns: ColumnDef<EmployeeEfficiency>[] = [
  {
    accessorKey: "employee_id",
    header: "EmployeeId",
  },
  {
    accessorKey: "employee_name",
    header: "EmployeeName",
  },
  {
    accessorKey: "project_id",
    header: "ProjectId",
  },
  {
    accessorKey: "resource_id",
    header: "ResourceId",
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
    accessorKey: "required_quantity",
    header: "RequiredQuantity",
  },
  {
    accessorKey: "prepared_quantity",
    header: "PreparedQuantity",
  },
  {
    accessorKey: "efficiency",
    header: "Efficiency",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ViewStatus row={row} />;
    },
  },
];

const ViewStatus = ({ row }: any) => {
  const viewData = row.original;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <GrFormView className="text-2xl" />
      </DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader className="py-2 w-full bg-theme flex justify-center items-center rounded-lg">
          <DialogTitle className="text-white">
            View EmployeeEfficiency
          </DialogTitle>
        </DialogHeader>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  gap-2">
          {Object.entries(viewData).map(([key, value], index) => {
            return (
              <div className="items-center gap-4" key={index}>
                <div className="mb-1 capitalize">{key}</div>
                <Input disabled value={value as string} />
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
