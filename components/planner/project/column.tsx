"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectData } from "@/types";
import { useProjectStore } from "@/state";

import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/data/projects";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { RxCaretSort } from "react-icons/rx";

export const CellFunction = ({ row }: any) => {
  const queryClient = useQueryClient();
  const project = row.original;
  const setProject = useProjectStore((state: any) => state.setProject);
  const handleUpdateUser = () => {
    setProject({ ...project });
  };
  const deleteItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await deleteProject(value);
      return deleteCode;
    },
    onSuccess: (value) => {
      if (value?.status) {
        toast.success(`${value.message}`, {
          description: `${value.message}`,
          position: "top-right",
          dismissible: true,
        });
      } else {
        toast.error(`Something went wrong`, {
          description: "Data not updated contact the admin",
          position: "top-right",
          dismissible: true,
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (value) => {
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  return (
    <TableActionButtonComponents
      primaryLable="Edit"
      primaryAction={() => {
        handleUpdateUser();
      }}
      primaryIcon={TbEdit}
      alertlable="Delete"
      alertlableIcon={MdDelete}
      alertheading=" Are you absolutely sure?"
      alertIcon={IoIosWarning}
      alertactionLable="Delete"
      alertcloseAllFunction={() => {}}
      values={project}
      alertdescription="  This action cannot be undone. This will permanently delete
                    your data and remove from our server."
      alertactionFunction={() => {
        deleteItem.mutate(`${project.id}`);
      }}
    />
  );
};

export const projectColumns: ColumnDef<ProjectData>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "project_id",
    header: "Project ID",
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
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
    ),
  },
  {
    accessorKey: "planner_remark",
    header: "Remarks",
    cell: ({ row }) => (
      <div className="flex justify-start items-center">
        {row.original.planner_remark.substring(0, 30)}{" "}
        {row.original.planner_remark.length > 30 && "..."}
        {row.original.planner_remark.length > 30 && (
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
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={`cursor-pointer rounded-md ${
          row.original.status === "Active" ? "bg-green-500" : "bg-red-500"
        }`}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellFunction row={row} />;
    },
  },
];
