"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ResourceData } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { useResourceStore } from "@/state";

import { Button } from "@/components/ui/button";

import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { deleteResource } from "@/data/resources";
import { Badge } from "@/components/ui/badge";
import { RxCaretSort } from "react-icons/rx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export const CellFunction = ({ row }: any) => {
  const queryClient = useQueryClient();
  const resource = row.original;
  const setResource = useResourceStore((state: any) => state.setResource);
  const handleUpdateUser = () => {
    setResource({ ...resource }); // Updating user object
  };
  const deleteItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await deleteResource(value);
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
      queryClient.invalidateQueries({ queryKey: ["resource"] });
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
      values={resource}
      alertdescription="  This action cannot be undone. This will permanently delete
                    your data and remove from our server."
      alertactionFunction={() => {
        deleteItem.mutate(`${resource.id}`);
      }}
    />
  );
};

export const columns: ColumnDef<ResourceData>[] = [
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
    accessorKey: "resource_id",
    header: "Resource ID",
  },
  {
    accessorKey: "res_description",
    header: "Description",
    cell: ({ row }) => (
      <div className="flex justify-start items-center">
        {row.original.res_description.substring(0, 30)}{" "}
        {row.original.res_description.length > 30 && "..."}
        {row.original.res_description.length > 30 && (
          <Popover>
            <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
              <RxCaretSort className="text-theme" size={20} />
            </PopoverTrigger>

            <PopoverContent className="w-[400px] ">
              <p className="mb-2 text-bold">Description:</p>
              <p className="text-sm text-neutral-500">
                {row.original.res_description}
              </p>
            </PopoverContent>
          </Popover>
        )}
      </div>
    ),
  },
  {
    accessorKey: "res_note",
    header: "Note",
    cell: ({ row }) => (
      <div className="flex justify-start items-center">
        {row.original.res_note === null || row.original.res_note === "" ? (
          "--"
        ) : (
          <div>
            {row.original.res_note.substring(0, 30)}{" "}
            {row.original.res_note.length > 30 && "..."}
            {row.original.res_note.length > 30 && (
              <Popover>
                <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
                  <RxCaretSort className="text-theme" size={20} />
                </PopoverTrigger>

                <PopoverContent className="w-[400px] ">
                  <p className="mb-2 text-bold">Description:</p>
                  <p className="text-sm text-neutral-500">
                    {row.original.res_note}
                  </p>
                </PopoverContent>
              </Popover>
            )}
          </div>
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
