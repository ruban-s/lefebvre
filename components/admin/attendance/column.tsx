"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { AttendanceTypeData } from "@/types";
import { useAttendanceTypeStore, useMeasureStore } from "@/state";
import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { deleteAttendanceType } from "@/data/attendanceType";
import { Badge } from "@/components/ui/badge";

export const CellFunction = ({ row }: any) => {
  const queryClient = useQueryClient();

  const attendanceType = row.original;

  const setAttendanceType = useAttendanceTypeStore(
    (state: any) => state.setAttendanceType
  );
  const handleUpdateUser = () => {
    setAttendanceType({ ...attendanceType }); // Updating user object
  };
  const deleteItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await deleteAttendanceType(value);
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
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
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
      values={attendanceType}
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
        deleteItem.mutate(`${attendanceType.id}`);
      }}
    />
  );
};

export const columns: ColumnDef<AttendanceTypeData>[] = [
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
    accessorKey: "type",
    header: "Attendance Type",
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
