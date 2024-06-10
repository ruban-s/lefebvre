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
import { getAllLabourCard } from "@/data/labour-card";
import { parse } from "date-fns";

export const CellFunction = ({ row }: any) => {
  const queryClient = useQueryClient();
  const workOrders = row.original;
  const setResourceWorkOrder = useResourceWorkOrderStore(
    (state: any) => state.setResourceWorkOrder
  );
  const handleUpdateUser = () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const data = await getAllLabourCard();
          const labourCards = JSON.parse(data.data);

          const filterLabourCards = labourCards.filter(
            (val: any) =>
              val.project_id === workOrders.project_id &&
              val.work_order_id === workOrders.work_order_id &&
              val.resource_id === workOrders.resourceId &&
              val.sq_no === workOrders.sq_no
          );

          if (filterLabourCards.length > 0) {
            reject(new Error("WorkOrderId existing in Labour card"));
          } else {
            resolve({});
            setResourceWorkOrder({ ...workOrders });
          }
        } catch (err) {
          reject(err);
        }
      }),
      {
        loading: "Loading...",
        success: "ResourceId is ready for editing!",
        error: "Unable to Edit: ResourceId existing in Labour card",
        position: "top-right",
        dismissible: true,
      }
    );
  };
  const deleteItem = useMutation({
    // mutationFn: async (value: any) => {
    // const deleteCode: any = await deleteResourceWorkOrder(value);
    // return deleteCode;
    // },
    mutationFn: async ({
      id,
      projectId,
      workOrderId,
      resourceId,
    }: {
      id: any;
      projectId: any;
      workOrderId: any;
      resourceId: any;
    }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await getAllLabourCard();
          const labourCards = JSON.parse(data.data);

          const filterLabourCards = labourCards.filter((val: any) => {
            console.log(resourceId, val.resource_id);
            return (
              val.project_id === projectId &&
              val.work_order_id === workOrderId &&
              val.resource_id === resourceId &&
              val.sq_no === workOrders.sq_no
            );
          });
          if (filterLabourCards.length > 0) {
            reject();
          } else {
            const deleteCode: any = await deleteResourceWorkOrder(id);
            queryClient.invalidateQueries({
              queryKey: ["resource-work-orders"],
            });
            resolve(deleteCode);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    // onSuccess: (value) => {
    //   if (value?.status) {
    //     toast.success(`${value.message}`, {
    //       description: `${value.message}`,
    //       position: "top-right",
    //       dismissible: true,
    //     });
    //   } else {
    //     toast.error(`Something went wrong`, {
    //       description: "Data not updated contact the admin",
    //       position: "top-right",
    //       dismissible: true,
    //     });
    //   }
    //   queryClient.invalidateQueries({
    //     queryKey: ["resource-work-orders"],
    //   });
    // },
    // onError: (value) => {
    //   toast.error(`Something went wrong`, {
    //     position: "top-right",
    //     dismissible: true,
    //   });
    // },
  });

  const handleDelete = () => {
    toast.promise(
      deleteItem.mutateAsync({
        id: workOrders.id,
        projectId: workOrders.project_id,
        workOrderId: workOrders.work_order_id,
        resourceId: workOrders.resourceId,
      }),
      {
        loading: "Loading...",
        success: "ResourceId deleted successfully!",
        error: "Error deleting ResourceId - Contact the admin",
        position: "top-right",
        dismissible: true,
      }
    );
  };

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
        // deleteItem.mutate(`${workOrders.id}`);
        handleDelete();
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
    accessorKey: "project_id",
    header: "Project ID",
  },
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
    header: "Estimated Hours",
  },
  {
    accessorKey: "actual_hour",
    header: "Actual Hours",
  },
  {
    accessorKey: "required_quantity",
    header: "Required Quantity",
  },
  {
    accessorKey: "quantity_unit",
    header: "Quantity Unit",
  },

  {
    accessorKey: "remark",
    header: "Remark",
    cell: ({ row }) => {
      return (
        <div className="flex justify-start items-center">
          {row.original.remark && row.original.remark.substring(0, 30)}{" "}
          {row.original.remark && row.original.remark.length > 30 && "..."}
          {row.original.remark && row.original.remark.length > 30 && (
            <Popover>
              <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
                <RxCaretSort className="text-theme" size={20} />
              </PopoverTrigger>

              <PopoverContent className="w-[400px] ">
                <p className="mb-2 text-bold">Remark:</p>
                <p className="text-sm text-neutral-500">
                  {row.original.remark}
                </p>
              </PopoverContent>
            </Popover>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBar row={row} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellFunction row={row} />;
    },
  },
];

const StatusBar = ({ row }: { row: any }) => {
  console.log(row);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = parse(row.original?.endDate, "dd-MM-yyyy", new Date());
  endDate.setHours(0, 0, 0, 0);
  const badgeClass = (() => {
    if (
      (row.original.status === "Released" ||
        row.original.status === "Active") &&
      endDate < today
    ) {
      return "bg-yellow-500";
    }
    if (
      row.original.status === "Released" ||
      row.original.status === "Active"
    ) {
      return "bg-green-500";
    }
    if (
      row.original.status === "Unreleased" ||
      row.original.status === "Inactive"
    ) {
      return "bg-red-500";
    }
    if (
      row.original.status === "Canceled" ||
      row.original.status === "Closed"
    ) {
      return "bg-orange-500";
    }
    return "bg-black";
  })();

  return (
    <Badge className={`cursor-pointer rounded-md ${badgeClass}`}>
      {row.original.status}
    </Badge>
  );
};
