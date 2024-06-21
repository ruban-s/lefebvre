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
import { getAllUser } from "@/data/user";
import { useEffect, useState } from "react";

export const CellFunction = ({ row }: any) => {
  const queryClient = useQueryClient();
  const workOrders = row.original;
  const [foreman, setForeman] = useState();

  const fetchFormans = async () => {
    const formans = await getAllUser();
    const data = JSON.parse(formans?.data);
    const names = row.original.forman?.map((formanId: string) => {
      const forman = data.find((employee: any) => {
        return employee.id === parseInt(formanId);
      });
      return forman ? forman.name : "";
    });
    setForeman(names);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchFormans();
    };
    fetchData();
  }, [row.original.forman]);

  const dynamicWorkOrder = [
    { name: "Id", value: workOrders.id, cover: "half" },
    { name: "WorkOrder Id", value: workOrders.work_order_id, cover: "half" },
    { name: "Resource", value: workOrders.resourceId, cover: "half" },
    { name: "Sq no", value: workOrders.sqNumber, cover: "half" },
    { name: "Description", value: workOrders.description, cover: "full" },
    { name: "Start Date", value: workOrders.start_date, cover: "half" },
    { name: "End Date", value: workOrders.end_date, cover: "half" },
    {
      name: "Bench Mark Measure",
      value: workOrders.bench_mark_measure,
      cover: "half",
    },
    {
      name: "Bench Mark Unit",
      value: workOrders.bench_mark_unit,
      cover: "half",
    },
    { name: "Estimate Hrs", value: workOrders.estimateHour, cover: "half" },
    { name: "Actual Hrs", value: workOrders.actualHour, cover: "half" },
    {
      name: "Balance Hrs",
      value: (
        parseFloat(workOrders.estimateHour) - parseFloat(workOrders.actualHour)
      ).toFixed(2),
      cover: "full",
    },
    {
      name: "Required Qty",
      value: workOrders.required_quantity,
      cover: "half",
    },
    {
      name: "Prepared Qty",
      value: workOrders.prepared_quantity,
      cover: "half",
    },
    {
      name: "Balance Qty",
      value:
        parseInt(workOrders.required_quantity) -
        parseInt(workOrders.prepared_quantity),
      cover: "full",
    },
    { name: "Forman", value: foreman, cover: "half" },
    { name: "Status", value: workOrders.status, cover: "half" },
  ];
  const setResourceWorkOrder = useResourceWorkOrderStore(
    (state: any) => state.setResourceWorkOrder
  );
  const handleUpdateUser = () => {
    setResourceWorkOrder({ ...workOrders });
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
      dynamicValues={dynamicWorkOrder}
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
    header: "Estimated Hrs",
    cell: ({ row }: { row: any }) => {
      // const estimated = parseFloat(row.original.estimated_hour);
      return <p>{row.original.estimated_hour}</p>;
    },
  },
  {
    accessorKey: "actual_hour",
    header: "Actual Hrs",
    cell: ({ row }: { row: any }) => {
      const actual_hour = parseFloat(row.original.actual_hour);
      return <p>{actual_hour.toFixed(2)}</p>;
    },
  },
  {
    accessorKey: "ballance_hour",
    header: "Balanced Hrs",
    cell: ({ row }: { row: any }) => {
      const actual = parseFloat(row.original.actual_hour);
      const estimated = parseFloat(row.original.estimated_hour);
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
    accessorKey: "prepared_quantity",
    header: "Prepared Qty",
  },
  {
    accessorKey: "balance_quantity",
    header: "Balance Qty",
    cell: ({ row }: { row: any }) => {
      const balance =
        parseInt(row.original.required_quantity) -
        parseInt(row.original.prepared_quantity);
      return (
        <div className={`${balance > 0 ? "text-inherit" : "text-red-500"}`}>
          {balance}
        </div>
      );
    },
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
