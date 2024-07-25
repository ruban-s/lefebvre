import { DashbaordProjectData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { RxCaretSort } from "react-icons/rx";

export const ProjectColumn: ColumnDef<DashbaordProjectData>[] = [
  {
    accessorKey: "project_id",
    header: "Project ID",
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="flex justify-start items-center">
          {row.original.description.substring(0, 10)}{" "}
          {row.original.description.length > 10 && "..."}
          {row.original.description.length > 10 && (
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
      );
    },
  },
  {
    accessorKey: "released_work_order",
    header: "Released Workorder",
  },
  {
    accessorKey: "unreleased_work_order",
    header: "UnReleased Workorder",
  },
];
