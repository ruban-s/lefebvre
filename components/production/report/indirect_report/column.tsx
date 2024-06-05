"use client";
import StatusBadge from "@/components/common/status-badge";
import { IndirectReport } from "@/types";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RxCaretSort } from "react-icons/rx";

export const Columns: ColumnDef<IndirectReport>[] = [
  {
    accessorKey: "employee_id:",
    header: "EmployeeId",
  },
  {
    accessorKey: "employee_name",
    header: "Employee Name",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "gl_code",
    header: "GlCode",
  },
  {
    accessorKey: "gl_description",
    header: "GlDescription",
    cell: ({ row }) => (
      <>
        {row.original.gl_description && (
          <div className="flex justify-start items-center">
            {row.original.gl_description.substring(0, 30)}{" "}
            {row.original.gl_description.length > 30 && "..."}
            {row.original.gl_description.length > 30 && (
              <Popover>
                <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
                  <RxCaretSort className="text-theme" size={20} />
                </PopoverTrigger>

                <PopoverContent className="w-[400px] ">
                  <p className="mb-2 text-bold">Description:</p>
                  <p className="text-sm text-neutral-500">
                    {row.original.gl_description}
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
    accessorKey: "in_time",
    header: "InTime",
  },
  {
    accessorKey: "out_time",
    header: "OutTime",
  },
  {
    accessorKey: "date",
    header: "Date",
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
          <DialogTitle className="text-white">View IndirectReport</DialogTitle>
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
