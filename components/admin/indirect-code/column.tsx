"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Terminal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { IndirectCodeData } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { useIndirectCodeStore, useStore } from "@/state";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoIosWarning } from "react-icons/io";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { toast } from "sonner";
import { deleteIndirectCode } from "@/data/indirect-code";
import { useRef } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import AlertDialogComponent from "@/components/common/alertDialogComponent";
import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<IndirectCodeData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "indirectCode",
    header: "Indirect Code ID",
  },
  {
    accessorKey: "name",
    header: "GL-Code",
  },
  {
    accessorKey: "description",
    header: "Description",
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
      const indirectCode = row.original;
      const queryClient = useQueryClient();

      const setIndirect = useIndirectCodeStore(
        (state: any) => state.setIndirect
      );
      const handleUpdateUser = () => {
        setIndirect({ ...indirectCode }); // Updating user object
      };
      const deleteItem = useMutation({
        mutationFn: async (value: any) => {
          const deleteCode: any = await deleteIndirectCode(value);
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
          queryClient.invalidateQueries({ queryKey: ["indirects"] });
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
          alertdescription="  This action cannot be undone. This will permanently delete
                    your data and remove from our server."
          alertactionFunction={() => {
            deleteItem.mutate(`${indirectCode.id}`);
          }}
        />
      );
    },
  },
];
