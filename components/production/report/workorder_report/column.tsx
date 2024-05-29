"use client";
import StatusBadge from "@/components/common/status-badge";
import { WorkOrderDataReport } from "@/types";
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

export const columns: ColumnDef<WorkOrderDataReport>[] = [
  {
    accessorKey: "project_id",
    header: "ProjectId",
  },
  {
    accessorKey: "customer_name",
    header: "P.O Name",
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
    accessorKey: "estimated_hour",
    header: ({ table }) => {
      var Sum = 0;
      table.getRowModel().rows.map((row: any) => {
        Sum += parseInt(row.original.estimated_hour);
      });
      return (
        <span>
          EstimatedHour
          <h1 className="text-black">{`( Total : ${Sum} )`}</h1>
        </span>
      );
    },
  },
  {
    accessorKey: "actual_hour",
    header: ({ table }) => {
      var Sum = 0;
      table.getRowModel().rows.map((row: any) => {
        Sum += parseInt(row.original.actual_hour);
      });
      return (
        <span>
          ActualHour
          <h1 className="text-black">{`( Total : ${Sum} )`}</h1>
        </span>
      );
    },
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
    accessorKey: "resource_id",
    header: "ResourceId",
    cell: ({ row }) => {
      return <SearchResourceId row={row} />;
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
    id: "action",
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return <ViewStatus row={row} />;
    },
  },
];

const SearchResourceId = ({ row }: any) => {
  return (
    <div className="border-2 rounded-sm capitalize p-2">
      <Link
        href={{
          pathname: `/production/report/project_summary/${row.original.project_id}`,
          query: {
            work_order_id: row.original.work_order_Id,
          },
        }}
        className="flex flex-row justify-center items-center">
        View ResourceId
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
          <DialogTitle className="text-white">View WorkOrder</DialogTitle>
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
