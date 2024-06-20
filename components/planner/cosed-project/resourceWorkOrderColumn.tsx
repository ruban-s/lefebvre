"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ResourceWorkOdderData } from "@/types";
import { useResourceWorkOrderStore } from "@/state";

import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResourceWorkOrder } from "@/data/resource-work-order";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { RxCaretSort } from "react-icons/rx";
import StatusBadge from "@/components/common/status-badge";

export const CellFunction = ({ row }: any) => {
  const queryClient = useQueryClient();
  const workOrders = row.original;
  const setResourceWorkOrder = useResourceWorkOrderStore(
    (state: any) => state.setResourceWorkOrder
  );
  const handleUpdateUser = () => {
    setResourceWorkOrder({ ...workOrders });
  };
  const deleteItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await deleteResourceWorkOrder(value);
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
      queryClient.invalidateQueries({ queryKey: ["resource-work-orders"] });
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
      values={workOrders}
      alertdescription="  This action cannot be undone. This will permanently delete
                    your data and remove from our server."
      alertactionFunction={() => {
        deleteItem.mutate(`${workOrders.id}`);
      }}
    />
  );
};

export const workOrderListcolumns: ColumnDef<ResourceWorkOdderData>[] = [
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
    accessorKey: "work_order_id",
    header: "Work Order Id",
  },

  {
    accessorKey: "resourceId",
    header: "Resource ID",
  },
  {
    accessorKey: "sqNumber",
    header: "Seq No",
  },
  {
    accessorKey: "bench_mark_measure",
    header: "Bench Mark Measure",
  },
  {
    accessorKey: "bench_mark_unit",
    header: "Bench Mark Unit",
  },
  {
    accessorKey: "estimated_hour",
    header: "Estimated Hrs",
    cell: ({ row }) => {
      const estimated_hour = parseFloat(row.original.estimated_hour);
      return <p>{estimated_hour.toFixed(2)}</p>;
    },
  },
  {
    accessorKey: "actual_hour",
    header: "Actual Hrs",
    cell: ({ row }) => {
      const actual_hrs = parseFloat(row.original.actual_hour);
      return <p>{actual_hrs.toFixed(2)}</p>;
    },
  },
  {
    accessorKey: "balanceHour",
    header: "Balance Hrs",
    cell: ({ row }: { row: any }) => {
      const estimated = parseFloat(row.original.estimated_hour);
      const actual = parseFloat(row.original.actual_hour);
      const balanceHour = estimated - actual;
      return (
        <p className={`${balanceHour > 0 ? "text-inherit" : "text-red-500"}`}>
          {balanceHour.toFixed(2)}
        </p>
      );
    },
  },
  {
    accessorKey: "required_quantity",
    header: "Required Qty",
  },
  {
    accessorKey: "quantity_unit",
    header: "Quantity Unit",
  },

  {
    accessorKey: "remark",
    header: "Remark",
    cell: ({ row }) => (
      <div className="flex justify-start items-center">
        {row.original.remark.substring(0, 30)}{" "}
        {row.original.remark.length > 30 && "..."}
        {row.original.remark.length > 30 && (
          <Popover>
            <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
              <RxCaretSort className="text-theme" size={20} />
            </PopoverTrigger>

            <PopoverContent className="w-[400px] ">
              <p className="mb-2 text-bold">Remark:</p>
              <p className="text-sm text-neutral-500">{row.original.remark}</p>
            </PopoverContent>
          </Popover>
        )}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge row={row} />,
  },
];
