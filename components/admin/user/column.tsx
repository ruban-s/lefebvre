"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { UserData } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { useStore } from "@/state";

import { Button } from "@/components/ui/button";

import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/data/user";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<UserData>[] = [
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "role_name",
    header: "Role",
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
      const queryClient = useQueryClient();

      const user = row.original;
      const setUser = useStore((state: any) => state.setUser);
      const handleUpdateUser = () => {
        setUser({ ...user }); // Updating user object
      };
      const deleteItem = useMutation({
        mutationFn: async (value: any) => {
          const deleteCode: any = await deleteUser(value);
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
          queryClient.invalidateQueries({ queryKey: ["users"] });
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
            deleteItem.mutate(`${user.id}`);
          }}
        />
      );
    },
  },
];
