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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { GrFormView } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RxCaretSort } from "react-icons/rx";
export const columns: ColumnDef<ProjectSummary>[] = [
  {
    accessorKey: "projectId",
    header: "ProjectId",
  },
  {
    accessorKey: "customer_name",
    header: "P.O Name",
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
    cell: ({ row }) => (
      <>
        {row.original.description && (
          <div className="flex justify-start items-center">
            {row.original.description.substring(0, 30)}{" "}
            {row.original.description.length > 30 && "..."}
            {row.original.description.length > 30 && (
              <Popover>
                <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
                  <RxCaretSort className="text-theme" size={20} />
                </PopoverTrigger>

                <PopoverContent className="w-[400px] ">
                  <p className="mb-2 text-bold">Description:</p>
                  <p className="text-sm text-neutral-500">
                    {row.original.description}
                  </p>
                </PopoverContent>
              </Popover>
            )}
          </div>
        )}
      </>
    ),
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
      return <StatusBadge row={row} />;
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
        <GrFormView className="text-2xl cursor-pointer" />
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
