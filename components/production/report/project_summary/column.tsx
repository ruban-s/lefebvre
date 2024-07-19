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
import {
  calculateBalanceHoursForFormattedTime,
  formatHours,
  formatHoursForFormattedTime,
} from "@/commonfunction";
export const columns: ColumnDef<ProjectSummary>[] = [
  {
    accessorKey: "projectId",
    header: "Project ID",
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
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
    accessorKey: "estimated_hour",
    header: "Estimate Hrs",
    cell: ({ row }) => {
      const estimate =
        row.original.estimated_hour === undefined ||
        row.original.estimated_hour === "" ||
        row.original.estimated_hour.length === 0
          ? "0"
          : formatHoursForFormattedTime(row.original.estimated_hour);
      return <p>{estimate}</p>;
    },
  },
  {
    accessorKey: "actual_hour",
    header: "Actual Hrs",
    cell: ({ row }) => {
      const actual =
        row.original.actual_hour === undefined ||
        row.original.actual_hour === "" ||
        row.original.actual_hour.length === 0
          ? "0"
          : formatHoursForFormattedTime(row.original.actual_hour);
      return <p>{actual}</p>;
    },
  },
  {
    accessorKey: "balanceHour",
    header: "Balance Hrs",
    cell: ({ row }) => {
      const balance = calculateBalanceHoursForFormattedTime(
        row.original.estimated_hour,
        row.original.actual_hour
      );
      return (
        <p
          className={`${
            balance.color === "red" ? "text-red-500" : "text-inherit"
          }`}>
          {balance.hours}
        </p>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },
  {
    accessorKey: "work_order",
    header: "View WorkOrder",
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
        WorkOrder
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
              <div
                className={`items-center gap-4 ${
                  key === "variance"
                    ? "sm:col-span-2 md:col-span-2 lg:col-span-2"
                    : ""
                }`}
                key={index}>
                <div className="mb-1 capitalize">{key}</div>
                <Input
                  className="border-2 border-gray-400"
                  disabled
                  value={value as string}
                />
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"} className="border-2 border-black">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
