"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectData, ResourceWorkOdderData, WorkOrderData } from "@/types";
import { useResourceWorkOrderStore } from "@/state";

import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteResourceWorkOrder,
  updateResourceWorkOrder,
} from "@/data/resource-work-order";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { RxCaretSort } from "react-icons/rx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { format, parse } from "date-fns";
import { DatePickerWithRange } from "@/components/common/dateRangePicker";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllWorkOrder } from "@/data/work-order";
import { getAllProject } from "@/data/projects";
import StatusBadge from "@/components/common/status-badge";
import {
  calculateBalanceHours,
  calculateMinutes,
  formatHours,
} from "@/commonfunction";

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
      queryClient.invalidateQueries({
        queryKey: ["resource-work-orders"],
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
  {
    accessorKey: "project_id",
    header: "Project ID",
  },
  {
    accessorKey: "work_order_id",
    header: "Work Order ID",
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
    cell: ({ row }: { row: any }) => {
      return (
        <p>
          {row.original.bench_mark_measure.length === 0 ? (
            "--"
          ) : (
            <div>{row.original.bench_mark_measure}</div>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "bench_mark_unit",
    header: "Bench Mark Unit",
    cell: ({ row }: { row: any }) => {
      return (
        <p>
          {row.original.bench_mark_unit.length === 0 ? (
            "--"
          ) : (
            <div>{row.original.bench_mark_unit}</div>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "estimated_hour",
    header: "Estimated Hrs",
    cell: ({ row }: { row: any }) => {
      const estimated = formatHours(row.original.estimated_hour);
      return <p>{estimated}</p>;
    },
  },
  {
    accessorKey: "actual_hour",
    header: "Actual Hrs",
    cell: ({ row }: { row: any }) => {
      const actual_hour = formatHours(row.original.actual_hour);
      return <p>{actual_hour}</p>;
    },
  },
  {
    accessorKey: "ballanceHour",
    header: "Balance Hrs",
    cell: ({ row }) => {
      const estimate = calculateMinutes(row.original.estimated_hour);
      const actual = calculateMinutes(row.original.actual_hour);
      const balance = calculateBalanceHours(estimate, actual);
      return (
        <p
          className={`${
            balance.color === "red" ? "text-red-500" : "text-inherit"
          }`}>
          {balance.hours}
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBar row={row} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UpdateStatus row={row} />;
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
export const UpdateStatus = ({ row }: any) => {
  const data: ResourceWorkOdderData = row.original as ResourceWorkOdderData;
  const ref = useRef<HTMLButtonElement>(null);

  const payLoad = {
    estimated_hour: data.estimated_hour,
    bench_mark_measure: data.bench_mark_measure,
    bench_mark_unit: data.bench_mark_unit,
    remark: data.remark,
    required_quantity: data.required_quantity,
    sqNumber: data.sqNumber,
    status: data.status,
    ballance_hour: data.ballance_hour,
    ballanced_quantity: data.ballanced_quantity,
    employee_id: data.employee_id,
    endDate: data.endDate,
    actual_hour: data.actual_hour,
    forman: data.attachment,
    attachment: [],
    project_id: data.project_id,
    resourceId: data.resourceId,
    prepared_quantity: data.prepared_quantity,
    startDate: data.startDate,
    work_order_id: data.work_order_id,
    quantity_unit: data.quantity_unit,
  };

  const queryClient = useQueryClient();
  const updateItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await updateResourceWorkOrder({
        id: data.id,
        ...value,
      });
      return deleteCode;
    },
    onSuccess: (value) => {
      if (value?.status || value?.message === `For input string: ""`) {
        if (value?.message === `For input string: ""`) {
          toast.success(`Data updated successfully!`, {
            description: `Data updated successfully!`,
            position: "top-right",
            dismissible: true,
          });
        } else {
          toast.success(`${value.message}`, {
            description: `${value.message}`,
            position: "top-right",
            dismissible: true,
          });
        }
      } else {
        toast.error(`Something went wrong`, {
          description: "Data not updated contact the admin",
          position: "top-right",
          dismissible: true,
        });
      }
      queryClient.invalidateQueries({
        queryKey: [
          "resource-work-orders",
          "cancelled-resource-work-orders",
          "closed-resource-work-orders",
        ],
      });
    },
    onError: (value) => {
      console.log(value);
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const {
    data: workOrders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["work-orders"],
    queryFn: async () => {
      const data = await getAllWorkOrder();
      return JSON.parse(data.data) as WorkOrderData[];
    },
  });
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await getAllProject();
      return JSON.parse(data.data) as ProjectData[];
    },
  });
  return (
    <>
      {/* <TbEdit
        onClick={() => {
          const project: ProjectData[] | undefined = projects?.filter(
            (info) => info.project_id == data.project_id
          )!;
          if (project[0]?.status !== "Released") {
            return toast.error(`Project ${data.project_id} not released!`, {
              position: "top-right",
              dismissible: true,
            });
          }

          const workOrder: WorkOrderData[] | undefined = workOrders?.filter(
            (info) => info.work_order_id == data.work_order_id
          )!;
          if (workOrder[0]?.status !== "Released") {
            return toast.error(
              `Work Order ${data.work_order_id} not released!`,
              {
                position: "top-right",
                dismissible: true,
              }
            );
          }
          return ref.current?.click();
        }}
      /> */}
      <Dialog>
        <DialogTrigger ref={ref}>
          <TbEdit />
        </DialogTrigger>
        <DialogContent
          className="w-[600px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}>
          <DialogHeader className="py-2 w-full bg-theme flex justify-center items-center rounded-lg">
            <DialogTitle className="text-white">Change Status</DialogTitle>
          </DialogHeader>
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  gap-2">
            <div className="items-center gap-4">
              <div className="mb-1">Project Id</div>
              <Input disabled value={data.project_id} />
            </div>
            <div className="items-center gap-4">
              <div className="mb-1">Work Order Id</div>

              <Input disabled value={data.work_order_id} />
            </div>

            <div className="items-center gap-4">
              <div className="mb-1">Resource Id</div>
              <Input disabled value={data.resourceId} />
            </div>
            <div className="items-center gap-4">
              <div className="mb-1">Seq No</div>
              <Input disabled value={data.sqNumber} />
            </div>
            <div className="items-center gap-4">
              <div className="mb-1">Bench Mark Measure</div>
              <Input disabled value={data.bench_mark_measure} />
            </div>
            <div className="items-center gap-4">
              <div className="mb-1">Bench Mark Unit</div>
              <Input disabled value={data.bench_mark_unit} />
            </div>
            <div className="items-center gap-4">
              <div className="mb-1">Estimated Hours</div>
              <Input disabled value={data.estimated_hour} />
            </div>

            <div className="items-center gap-4">
              <div className="mb-1">Required Quantity</div>
              <Input disabled value={data.required_quantity} />
            </div>
            <div className="items-center gap-4">
              <div className="mb-1">Quantity Unit</div>
              <Input disabled value={data.quantity_unit} />
            </div>
            <div className="items-center gap-4">
              <div className="mb-1">Planner Remark</div>
              <Input disabled value={data.remark ? data.remark : "--"} />
            </div>
            <div className="items-center gap-4">
              <div className="mb-1">Start Date</div>
              <Input disabled value={data.startDate} />
            </div>
            <div className="items-center gap-4">
              <div className="mb-1">End Date</div>
              <Input disabled value={data.endDate} />
            </div>

            <div className="items-center gap-4">
              <div className="mb-1">Status</div>
              <Select
                onValueChange={(value) => {
                  payLoad.status = value;
                }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={row.original.status} />
                </SelectTrigger>
                <SelectContent className="hovrer:none">
                  <SelectItem value="Released">Released</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="Canceled" className="text-orange-500">
                    Canceled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant={"secondary"} onClick={() => {}}>
                Close
              </Button>
            </DialogClose>
            <DialogClose>
              <Button
                variant={"default"}
                className="bg-theme"
                onClick={() => {
                  updateItem.mutate(payLoad);
                }}>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
