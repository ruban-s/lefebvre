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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RxCaretSort } from "react-icons/rx";
import { useSearchParams } from "next/navigation";

export const columns: ColumnDef<WorkOrderDataReport>[] = [
  {
    accessorKey: "project_id",
    header: "Project ID",
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "work_order_Id",
    header: "WorkOrder ID",
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
    header: ({ table }) => {
      var Sum = 0;
      table.getRowModel().rows.map((row: any) => {
        Sum += parseInt(row.original.estimated_hour);
      });
      return (
        <span>
          Estimated Hour
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
          Actual Hour
          <h1 className="text-black">{`( Total : ${Sum} )`}</h1>
        </span>
      );
    },
  },
  {
    header: "Balance Hour",
    accessorKey: "balanced_hour",
    cell: ({ row }: { row: any }) => {
      const balancedHour =
        row.original.estimated_hour - row.original.actual_hour;
      return <span>{balancedHour}</span>;
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
    accessorKey: "resource_id",
    header: "View Resource ID",
    cell: ({ row }) => {
      return <SearchResourceId row={row} />;
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
    id: "action",
    cell: ({ row }) => {
      return <ViewStatus row={row} />;
    },
  },
];

const SearchResourceId = ({ row }: any) => {
  const searchParams = useSearchParams();
  const work_order_id = searchParams.get("work_order_id");
  return (
    <div
      className={`border-2 rounded-sm capitalize p-2  ${
        work_order_id === row.original.work_order_Id
          ? "bg-black text-white"
          : ""
      }`}>
      <Link
        href={{
          pathname: `/production/report/project_summary/${row.original.project_id}`,
          query: {
            work_order_id: row.original.work_order_Id,
          },
        }}
        className={`flex flex-row justify-center items-center`}>
        Resource
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
          <DialogTitle className="text-white">View WorkOrder</DialogTitle>
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
