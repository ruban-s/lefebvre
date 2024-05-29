"use client";

import StatusBadge from "@/components/common/status-badge";
import { Badge } from "@/components/ui/badge";
import { ProjectSummary } from "@/types";
import { statuses } from "@/types/filter";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { GrFormView } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
    accessorKey: "work_order",
    header: "WorkOrder",
    cell: ({ row }) => {
      return <SearchByWorkOrder row={row} />;
    },
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
  {
    id: "actions",
    cell: ({ row }) => {
      return <ViewStatus row={row} />;
    },
  },
];

const SearchByWorkOrder = ({ row }: any) => {
  return (
    <div className="border-2 rounded-sm capitalize p-2">
      <Link
        href={`/production/report/project_summary/${row.original.projectId}`}
        className="flex flex-row justify-center items-center">
        View WorkOrder
      </Link>
    </div>
  );
};

const ViewStatus = ({ row }: any) => {
  const viewData = row.original;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <GrFormView className="text-2xl" />
      </DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader className="py-2 w-full bg-theme flex justify-center items-center rounded-lg">
          <DialogTitle className="text-white">View ProjectSummary</DialogTitle>
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
