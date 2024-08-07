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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import MultiFileSelect from "@/components/common/multiFileSelect";
import { getAllLabourCard } from "@/data/labour-card";
import {
  calculateBalanceHours,
  calculateMinutes,
  formatHours,
  RefetchWorkOrder,
  RefetchWorkOrderResources,
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
    accessorKey: "estimateHour",
    header: "Estimate Hrs",
    cell: ({ row }) => {
      const estimate =
        row.original.estimateHour === undefined ||
        row.original.estimateHour === "" ||
        row.original.estimateHour.length === 0
          ? "00:00"
          : formatHours(row.original.estimateHour);
      return <p>{estimate}</p>;
    },
  },
  {
    accessorKey: "actualHour",
    header: "Actual Hrs",
    cell: ({ row }) => {
      const actual =
        row.original.actualHour === undefined ||
        row.original.actualHour === "" ||
        row.original.actualHour.length === 0
          ? "00:00"
          : formatHours(row.original.actualHour);
      return <p>{actual}</p>;
    },
  },
  {
    accessorKey: "ballanceHour",
    header: "Balance Hrs",
    cell: ({ row }) => {
      const estimate =
        row.original.estimateHour === undefined ||
        row.original.estimateHour === "" ||
        row.original.estimateHour.length === 0
          ? 0
          : calculateMinutes(row.original.estimateHour);
      const actual =
        row.original.actualHour === undefined ||
        row.original.actualHour === "" ||
        row.original.actualHour.length === 0
          ? 0
          : calculateMinutes(row.original.actualHour);
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
    accessorKey: "production_remark",
    header: "Production Remark",
    cell: ({ row }) => (
      <div className="flex justify-start items-center">
        {row.original.production_remark?.length === 0 ||
        row.original.production_remark === null ? (
          "--"
        ) : (
          <>
            {row.original.production_remark?.substring(0, 15)}{" "}
            {row.original.production_remark?.length > 15 && "..."}
            {row.original.production_remark?.length > 15 && (
              <Popover>
                <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm">
                  <RxCaretSort className="text-theme" size={20} />
                </PopoverTrigger>
                <PopoverContent className="w-[400px]">
                  <p className="mb-2 text-bold">Description:</p>
                  <p className="text-sm text-neutral-500">
                    {row.original.production_remark}
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
                  className="flex flex-row gap-2 w-full"
                >
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
      return <UpdateStatus row={row} />;
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

export const UpdateStatus = ({ row }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const data = row.original;

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(data.start_date),
    to: new Date(data.end_date),
  });
  const [updatedImages, setUpdatedImages] = useState<string[]>([]);
  useEffect(() => {
    var startDate = data?.start_date!.toString().split("-");
    var endDate = data?.end_date!.toString().split("-");
    setDateRange({
      from: new Date(`${startDate[1]}-${startDate[0]}-${startDate[2]}`),
      to: new Date(`${endDate[1]}-${endDate[0]}-${endDate[2]}`),
    });
    setUpdatedImages(data.images);
  }, []);
  const payLoad = {
    work_order_id: data.work_order_id,
    description: data.description,
    images: data.images,
    production_remark: data.production_remark,
    planner_remark: data.planner_remark,
    project_id: data.project_id,
    start_date: data.start_date,
    end_date: data.end_date,
    status: data.status,
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
      return new Promise(async (resolve, reject) => {
        try {
          const labourCardData = await getAllLabourCard();
          const labourCards = JSON.parse(labourCardData.data);

          const filterLabourCards = labourCards.filter(
            (val: any) =>
              val.project_id === value.project_id &&
              val.work_order_id === value.work_order_id
          );
          if (filterLabourCards.length > 0 && value.status === "Unreleased") {
            reject(
              new Error(
                "WorkOrderId existing in Labour card,Unable to edit status"
              )
            );
          } else {
            const deleteCode: any = await updateWorkOrder({
              id: data.id,
              ...value,
              images: updatedImages,
            });
            if (value.status !== "Released") {
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
                status === "Released" &&
                  (await updateResourceWorkOrder({
                    id: resourceWorkData.id,
                    ...payLoad,
                  }));
              });
            }
            RefetchWorkOrder(queryClient);
            RefetchWorkOrderResources(queryClient);
            const updatedValue = JSON.parse(deleteCode.data);
            var startDate = updatedValue?.start_date!.toString().split("-");
            var endDate = updatedValue?.end_date!.toString().split("-");
            setDateRange({
              from: new Date(`${startDate[1]}-${startDate[0]}-${startDate[2]}`),
              to: new Date(`${endDate[1]}-${endDate[0]}-${endDate[2]}`),
            });
            // return deleteCode;
            resolve(deleteCode);
          }
        } catch (err) {
          reject(err);
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
    //   ["work-orders", "resource-work-orders"].map((info, index) => {
    //     queryClient.invalidateQueries({
    //       queryKey: [info],
    //     });
    //   });

    //   const updatedValue = JSON.parse(value.data);
    //   var startDate = updatedValue?.start_date!.toString().split("-");
    //   var endDate = updatedValue?.end_date!.toString().split("-");
    //   setDateRange({
    //     from: new Date(`${startDate[1]}-${startDate[0]}-${startDate[2]}`),
    //     to: new Date(`${endDate[1]}-${endDate[0]}-${endDate[2]}`),
    //   });
    // },
    // onError: (value) => {
    //   console.log(value);
    //   toast.error(`Something went wrong`, {
    //     position: "top-right",
    //     dismissible: true,
    //   });
    // },
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

  const handleUpdate = (value: any) => {
    toast.promise(updateItem.mutateAsync(value), {
      loading: "Loading...",
      success: "WorkOrder Updated successfully!",
      error: "Error updating project - Contact the admin",
      position: "top-right",
      dismissible: true,
    });
  };

  return (
    <>
      <TbEdit
        onClick={() => {
          const project: ProjectData[] | undefined = projects?.filter(
            (info) => info.project_id == data.project_id
          )!;
          if (project[0]?.status === "Released") {
            return ref.current?.click();
          }
          return toast.error(`Project ${data.project_id} not released!`, {
            position: "top-right",
            dismissible: true,
          });
        }}
      />
      <Dialog>
        <DialogTrigger ref={ref}></DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
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
            <div className="col-span-2">
              <p> Production Remarks:</p>
              <Textarea
                defaultValue={payLoad.production_remark}
                onChange={(value) => {
                  payLoad.production_remark = value.target.value;
                }}
              />
            </div>
            <div className=" col-span-2">
              <div>Start Date - End Date</div>
              <DatePickerWithRange
                onselect={(value: DateRange) => {
                  if (value?.from) {
                    payLoad.start_date = format(value.from, "dd-MM-yyyy");
                  }
                  if (value?.to) {
                    payLoad.end_date = format(value.to, "dd-MM-yyyy");
                  }
                }}
                selectedData={dateRange!}
                disabled={[]}
                tab="production"
                file="workOrder"
                matcher={{
                  from: data.start_date!,
                  to: data.end_date!,
                }}
              />
            </div>
            <div className="col-span-2">
              <div>Attachment</div>
              <MultiFileSelect
                files={updatedImages}
                onChange={(e: any) => {
                  setUpdatedImages([...e]);
                }}
              />
            </div>
            <div className=" col-span-2">
              <div>Status</div>

              <Select
                // value={payLoad.status}
                onValueChange={(value) => {
                  payLoad.status = value;
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={row.original.status} />
                </SelectTrigger>
                <SelectContent className="hovrer:none">
                  <SelectItem
                    disabled
                    value="Unreleased"
                    className="text-red-500">
                    Unreleased
                  </SelectItem>
                  <SelectItem value="Released" className="text-green-500">
                    Released
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
                  handleUpdate(payLoad);
                  // updateItem.mutate(payLoad);
                }}
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
