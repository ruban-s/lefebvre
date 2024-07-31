import { DashbaordProjectData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { RxCaretSort } from "react-icons/rx";

export const ReleasedProjectColumn: ColumnDef<DashbaordProjectData>[] = [
  {
    accessorKey: "project_id",
    header: "Project ID",
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "online_count",
    header: "Online",
  },
  {
    accessorKey: "offline_count",
    header: "Offline",
  },
  {
    accessorKey: "online_workorder_description",
    header: "Online Work Order",
    cell: ({ row }) => {
      const data = row.original.online_workorder_description;
      return (
        <div>
          {data.length === 0 ? (
            <p>--</p>
          ) : (
            <div className="flex flex-row justify-between">
              <p>
                {data[0].substring(0, 30)}
                {"..."}
              </p>
              <Popover>
                <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
                  <RxCaretSort className="text-theme" size={20} />
                </PopoverTrigger>
                <PopoverContent className="w-[400px] h-full max-h-[400px] overflow-auto">
                  <p className="mb-2 text-bold">Online Work Orders:</p>
                  <div className="flex flex-col gap-2">
                    {data.map((item, index) => (
                      <p key={index} className="text-sm text-neutral-500">
                        <span className="text-black pr-2">{index + 1}.</span>{" "}
                        {item}
                      </p>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "offline_workorder_description",
    header: "Offline Work Order",
    cell: ({ row }) => {
      const data = row.original.offline_workorder_description;
      return (
        <div>
          {data.length === 0 ? (
            <p>--</p>
          ) : (
            <div className="flex flex-row justify-between">
              <p>
                {data[0].substring(0, 30)}
                {"..."}
              </p>
              <Popover>
                <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
                  <RxCaretSort className="text-theme" size={20} />
                </PopoverTrigger>
                <PopoverContent className="w-[400px] h-full max-h-[400px] overflow-auto">
                  <p className="mb-2 text-bold">Online Work Orders:</p>
                  <div className="flex flex-col gap-2">
                    {data.map((item, index) => (
                      <p key={index} className="text-sm text-neutral-500">
                        <span className="text-black pr-2">{index + 1}.</span>{" "}
                        {item}
                      </p>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      );
    },
  },
];
