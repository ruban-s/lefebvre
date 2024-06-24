"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectData, ResourceWorkOdderData, WorkOrderData } from "@/types";
import { useWorkOrderStore } from "@/state";

import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteWorkOrder, updateWorkOrder } from "@/data/work-order";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { RxCaretSort } from "react-icons/rx";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { getAllProject } from "@/data/projects";
import ViewTabField from "@/components/common/viewTabField";
import StatusBadge from "@/components/common/status-badge";
import {
  getAllResourceWorkOrder,
  updateResourceWorkOrder,
} from "@/data/resource-work-order";
import {
  calculateBalanceHours,
  calculateMinutes,
  formatHours,
} from "@/commonfunction";

export const CellFunction = ({ row }: any) => {
  const queryClient = useQueryClient();
  const workOrders = row.original;
  const setWorkOrder = useWorkOrderStore((state: any) => state.setWorkOrder);
  const handleUpdateUser = () => {
    setWorkOrder({ ...workOrders });
  };
  const deleteItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await deleteWorkOrder(value);
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
        queryKey: ["work-orders"],
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

export const workOrderColumns: ColumnDef<WorkOrderData>[] = [
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
            {row.original.description.substring(0, 15)}{" "}
            {row.original.description.length > 15 && "..."}
            {row.original.description.length > 15 && (
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
    accessorKey: "estimateHour",
    header: "Estimate Hrs",
    cell: ({ row }) => {
      const estimate = formatHours(row.original.estimateHour);
      return <p>{estimate}</p>;
    },
  },
  {
    accessorKey: "actualHour",
    header: "Actual Hrs",
    cell: ({ row }) => {
      const actual = formatHours(row.original.actualHour);
      return <p>{actual}</p>;
    },
  },
  {
    accessorKey: "ballanceHour",
    header: "Balance Hrs",
    cell: ({ row }) => {
      const estimate = calculateMinutes(row.original.estimateHour);
      const actual = calculateMinutes(row.original.actualHour);
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
    accessorKey: "preparedQuantity",
    header: "Prepared Qty",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.preparedQuantity?.length === 0 ||
          row.original.preparedQuantity === null ? (
            "--"
          ) : (
            <div>{row.original.preparedQuantity}</div>
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
            {row.original.planner_remark.substring(0, 15)}{" "}
            {row.original.planner_remark.length > 15 && "..."}
            {row.original.planner_remark.length > 15 && (
              <Popover>
                <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm">
                  <RxCaretSort className="text-theme" size={20} />
                </PopoverTrigger>
                <PopoverContent className="w-[400px]">
                  <p className="mb-2 text-bold">Description:</p>
                  <p className="text-sm text-neutral-500">
                    {row.original.planner_remark}
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

          <PopoverContent className="w-[200px] ">
            {row.original.images.map((info, index) => {
              var file = info.split("/")[info.split("/").length - 1];
              return (
                <Link
                  href={info}
                  key={index}
                  className="flex justify-center items-center m-1">
                  {/* {file.split(".")[1] === "csv" && <FaFileCsv />}
                  {file.split(".")[1] === "pdf" && <FaFilePdf />}
                  {file.split(".")[1] === "xlsx" && <BsFiletypeXlsx />} */}
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
      return <UpdateStatus row={row} />;
    },
  },
];
export const UpdateStatus = ({ row }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const data = row.original;

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(data.start_date),
    to: new Date(data.end_date),
  });
  const payLoad = {
    work_order_id: data.work_order_id,
    description: data.description,
    images: data.images,
    planner_remark: data.planner_remark,
    project_id: data.project_id,
    start_date: data.start_date,
    end_date: data.end_date,
    status: data.status,
    preparedQuantity: data.preparedQuantity,
  };

  const queryClient = useQueryClient();
  const { data: resourceWorkOrder } = useQuery({
    queryKey: ["resource-work-orders"],
    queryFn: async () => {
      const data = await getAllResourceWorkOrder();
      return JSON.parse(data.data) as ResourceWorkOdderData[];
    },
  });
  const updateItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await updateWorkOrder({
        id: data.id,
        ...value,
      });

      if (
        value.status === "Closed" ||
        value.status === "Canceled" ||
        value.status === "Released"
      ) {
        var resourceWorkOrderList = resourceWorkOrder?.filter(
          (info) => info.project_id === value.project_id
        );
        resourceWorkOrderList?.map(async (resourceWorkData, index) => {
          const payLoad = {
            estimated_hour: resourceWorkData.estimated_hour,
            bench_mark_measure: resourceWorkData.bench_mark_measure,
            bench_mark_unit: resourceWorkData.bench_mark_unit,
            remark: resourceWorkData.remark,
            required_quantity: resourceWorkData.required_quantity,
            sqNumber: resourceWorkData.sqNumber,
            status: value.status,
            ballance_hour: resourceWorkData.ballance_hour,
            ballanced_quantity: resourceWorkData.ballanced_quantity,
            employee_id: resourceWorkData.employee_id,
            endDate: resourceWorkData.endDate,
            actual_hour: resourceWorkData.actual_hour,
            forman: resourceWorkData.forman,
            project_id: resourceWorkData.project_id,
            resourceId: resourceWorkData.resourceId,
            prepared_quantity: resourceWorkData.prepared_quantity,
            startDate: resourceWorkData.startDate,
            work_order_id: resourceWorkData.work_order_id,
            quantity_unit: resourceWorkData.quantity_unit,
          };
          const { status, ...data } = resourceWorkData;
          resourceWorkData.status !== value.status &&
            (await updateResourceWorkOrder({
              id: resourceWorkData.id,
              ...payLoad,
            }));
        });
      }
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
      [
        "work-orders",
        "resource-work-orders",
        "cancelled-work-orders",
        "cancelled-resource-work-orders",
        "closed-work-orders",
        "closed-resource-work-orders",
      ].map((info, index) => {
        queryClient.invalidateQueries({
          queryKey: [info],
        });
      });

      setDateRange(undefined);
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
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await getAllProject();
      return JSON.parse(data.data) as ProjectData[];
    },
  });
  return (
    <>
      <Dialog>
        <DialogTrigger ref={ref}>
          <TbEdit />
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}>
          <DialogHeader className="py-2 w-full bg-theme flex justify-center items-center rounded-lg">
            <DialogTitle className="text-white">Change Status</DialogTitle>
          </DialogHeader>
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  gap-2">
            <ViewTabField
              heading="Project Id"
              value={data.project_id}
              isInput
            />
            <ViewTabField
              heading="Work Orded Id"
              value={data.work_order_id}
              isInput
            />
            <ViewTabField
              heading="Description"
              value={data.description}
              isInput={false}
            />
            <ViewTabField
              heading="Planer Remarks"
              value={data.planner_remark}
              isInput={false}
            />
            <ViewTabField
              heading="Start Date"
              value={data.start_date}
              isInput={true}
            />
            <ViewTabField
              heading="End Date"
              value={data.end_date}
              isInput={true}
            />
            <div>
              <p>Prepared Quantity</p>
              <Input
                value={payLoad.preparedQuantity}
                onChange={(e) => (payLoad.preparedQuantity = e.target.value)}
              />
            </div>
            <div className=" col-span-1">
              <div>Status</div>
              <Select
                // value={payLoad.status}
                onValueChange={(value) => {
                  payLoad.status = value;
                }}>
                <SelectTrigger className="w-[200px]">
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

const StatusBar = ({ row }: { row: any }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = parse(row.original.end_date, "dd-MM-yyyy", new Date());
  endDate.setHours(0, 0, 0, 0);

  return (
    <Badge
      className={`cursor-pointer rounded-md ${
        (row.original.status === "Released" ||
          row.original.status === "Active") &&
        endDate < today
          ? "bg-yellow-500"
          : row.original.status === "Released" ||
            row.original.status === "Active"
          ? "bg-green-500"
          : row.original.status === "Unreleased" ||
            row.original.status === "Inactive"
          ? "bg-red-500"
          : row.original.status === "Canceled" ||
            row.original.status === "Closed"
          ? "bg-orange-500"
          : "bg-black"
      }`}>
      {row.original.status}
    </Badge>
  );
};
