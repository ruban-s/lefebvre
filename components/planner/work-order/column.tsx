"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectData, WorkOrderData } from "@/types";
import { useWorkOrderStore } from "@/state";

import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkOrder, getAllWorkOrder } from "@/data/work-order";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { RxCaretSort } from "react-icons/rx";
import Link from "next/link";
import { getAllLabourCard } from "@/data/labour-card";
import {
  deleteResourceWorkOrder,
  getAllResourceWorkOrder,
} from "@/data/resource-work-order";
import { parse } from "date-fns";
import {
  calculateBalanceHours,
  calculateMinutes,
  formatHours,
} from "@/commonfunction";

export const CellFunction = ({ row }: any) => {
  const queryClient = useQueryClient();
  // const workOrders = {
  //   ...row.original,
  //   estimateHour: parseFloat(row.original.estimateHour).toFixed(2),
  //   actualHour: parseFloat(row.original.actualHour).toFixed(2),
  //   ballance_hour: (
  //     parseFloat(row.original.estimateHour) -
  //     parseFloat(row.original.actualHour)
  //   ).toFixed(2),
  // };
  const workOrders = row.original;
  const balanceValue = () => {
    const estimate = calculateMinutes(workOrders.estimateHour);
    const actual = calculateMinutes(workOrders.actualHour);
    const balance = calculateBalanceHours(estimate, actual);
    return balance.hours;
  };

  const dynamicWorkOrder = [
    { name: "Id", value: workOrders.id, cover: "half" },
    { name: "WorkOrder Id", value: workOrders.work_order_id, cover: "half" },
    { name: "Description", value: workOrders.description, cover: "full" },
    { name: "Start Date", value: workOrders.start_date, cover: "half" },
    { name: "End Date", value: workOrders.end_date, cover: "half" },
    {
      name: "Estimate Hrs",
      value: formatHours(workOrders.estimateHour),
      cover: "half",
    },
    {
      name: "Actual Hrs",
      value: formatHours(workOrders.actualHour),
      cover: "half",
    },
    {
      name: "Balance Hrs",
      value: balanceValue(),
      cover: "full",
    },
    { name: "Planner Remark", value: workOrders.planner_remark, cover: "full" },
    { name: "Status", value: workOrders.status, cover: "half" },
  ];

  const setWorkOrder = useWorkOrderStore((state: any) => state.setWorkOrder);
  const handleUpdateUser = () => {
    setWorkOrder({ ...workOrders });
  };
  const deleteItem = useMutation({
    mutationFn: async ({
      id,
      projectId,
      workOrderId,
    }: {
      id: any;
      projectId: any;
      workOrderId: any;
    }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await getAllLabourCard();
          const labourCards = JSON.parse(data.data);

          const filterLabourCards = labourCards.filter((val: any) => {
            return (
              val.project_id === projectId && val.work_order_id === workOrderId
            );
          });
          if (filterLabourCards.length > 0) {
            reject();
          } else {
            const Resources = await getAllResourceWorkOrder();
            const parsedResources = JSON.parse(Resources.data);
            for (const item of parsedResources) {
              if (
                item.project_id === projectId &&
                item.work_order_id === workOrderId
              ) {
                await deleteResourceWorkOrder(item.id);
              }
            }
            const deleteCode = await deleteWorkOrder(id);
            ["work-orders", "resource-work-orders"].map((info, index) => {
              queryClient.invalidateQueries({
                queryKey: [info],
              });
            });
            resolve(deleteCode);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
  });

  const handleDelete = () => {
    toast.promise(
      deleteItem.mutateAsync({
        id: workOrders.id,
        projectId: workOrders.project_id,
        workOrderId: workOrders.work_order_id,
      }),
      {
        loading: "Loading...",
        success: "WorkOrder deleted successfully!",
        error: "Error deleting WorkOrderId - Contact the admin",
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
      dynamicValues={dynamicWorkOrder}
      alertdescription="  This action cannot be undone. This will permanently delete
                    your data and remove from our server."
      alertactionFunction={() => {
        handleDelete();
      }}
    />
  );
};

export const workOrderColumns: ColumnDef<WorkOrderData>[] = [
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <>
        {row.original.description && (
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
        )}
      </>
    ),
  },
  {
    accessorKey: "project_id",
    header: "Project ID",
  },
  {
    accessorKey: "requiredQuantity",
    header: "Required Qty",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.requiredQuantity?.length === 0 ||
          row.original.requiredQuantity === null ? (
            "--"
          ) : (
            <div>{row.original.requiredQuantity}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: (status) => (
      <div className="w-[90px]">{status.getValue() as React.ReactNode}</div>
    ),
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: (status) => (
      <div className="w-[90px]">{status.getValue() as React.ReactNode}</div>
    ),
  },
  {
    accessorKey: "planner_remark",
    header: "Planner Remark",
    cell: ({ row }) => (
      <div className="flex justify-start items-center">
        {row.original.planner_remark.length === 0 ? (
          "--"
        ) : (
          <>
            {row.original.planner_remark.substring(0, 30)}{" "}
            {row.original.planner_remark.length > 30 && "..."}
            {row.original.planner_remark.length > 30 && (
              <Popover>
                <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm">
                  <RxCaretSort className="text-theme" size={20} />
                </PopoverTrigger>
                <PopoverContent className="w-[400px]">
                  <p className="mb-2 text-bold">Description:</p>
                  <p className="text-sm text-neutral-500">
                    {row.original.description}
                  </p>
                </PopoverContent>
              </Popover>
            )}
          </>
        )}
      </div>
    ),
  },
  {
    accessorKey: "images",
    header: "Attachments",
    cell: ({ row }) => {
      var files = row.original.images;
      if (files.length < 1) return <p>--</p>;
      return (
        <Popover>
          <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
            Attachment
          </PopoverTrigger>

          <PopoverContent className="w-full flex flex-col gap-2 max-w-sm">
            {row.original.images.map((info, index) => {
              return (
                <Link
                  target="_blank"
                  key={index}
                  href={info}
                  className="flex flex-row gap-2 w-full">
                  {/* {file.split(".")[1] === "csv" && <FaFileCsv />}
                  {file.split(".")[1] === "pdf" && <FaFilePdf />}
                  {file.split(".")[1] === "xlsx" && <BsFiletypeXlsx />} */}
                  <span>{index + 1}</span>
                  {info.split("/")[4]}
                </Link>
              );
            })}
          </PopoverContent>
        </Popover>
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
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = parse(row.original.end_date, "dd-MM-yyyy", new Date());
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
