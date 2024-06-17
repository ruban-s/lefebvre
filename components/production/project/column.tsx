"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectData, ResourceWorkOdderData, WorkOrderData } from "@/types";
import { useProjectStore } from "@/state";

import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { deleteProject, updateProject } from "@/data/projects";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { RxCaretSort } from "react-icons/rx";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { format, parse } from "date-fns";
import { DatePickerWithRange } from "@/components/common/dateRangePicker";
import { DialogClose } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import ViewTabField from "@/components/common/viewTabField";
import StatusBadge from "@/components/common/status-badge";
import { getAllWorkOrder, updateWorkOrder } from "@/data/work-order";
import {
  getAllResourceWorkOrder,
  updateResourceWorkOrder,
} from "@/data/resource-work-order";
import { getAllLabourCard } from "@/data/labour-card";

export const CellFunction = ({ row }: any) => {
  const queryClient = useQueryClient();
  const project = row.original;
  const setProject = useProjectStore((state: any) => state.setProject);
  const handleUpdateUser = () => {
    setProject({ ...project });
  };
  const deleteItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await deleteProject(value);
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
        queryKey: ["projects"],
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
      values={project}
      alertdescription="  This action cannot be undone. This will permanently delete
                    your data and remove from our server."
      alertactionFunction={() => {
        deleteItem.mutate(`${project.id}`);
      }}
    />
  );
};
export const UpdateStatus = ({ row }: any) => {
  const data = row.original;
  const ref = useRef<HTMLButtonElement>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: data.start_date,
    to: data.end_date,
  });

  useEffect(() => {
    var startDate = data?.start_date!.toString().split("-");
    var endDate = data?.end_date!.toString().split("-");
    setDateRange({
      from: new Date(`${startDate[1]}-${startDate[0]}-${startDate[2]}`),
      to: new Date(`${endDate[1]}-${endDate[0]}-${endDate[2]}`),
    });
  }, []);
  const payLoad = {
    id: data.id,
    project_id: data.project_id,
    customer_name: data.customer_name,
    description: data.description,
    images: data.images,
    planner_remark: data.planner_remark,
    production_remark: data.production_remark,
    start_date: data.start_date,
    end_date: data.end_date,
    status: data.status,
  };
  const queryClient = useQueryClient();
  const { data: workOrders } = useQuery({
    queryKey: ["work-orders"],
    queryFn: async () => {
      const data = await getAllWorkOrder();
      return JSON.parse(data.data) as WorkOrderData[];
    },
  });
  const { data: resourceWorkOrder } = useQuery({
    queryKey: ["resource-work-orders"],
    queryFn: async () => {
      const data = await getAllResourceWorkOrder();
      return JSON.parse(data.data) as ResourceWorkOdderData[];
    },
  });

  const updateItem = useMutation({
    mutationFn: async (value: any) => {
      // const deleteCode: any = await updateProject(value);
      // if (value.status !== "Released") {
      //   var workOrderList = workOrders?.filter(
      //     (info) => info.project_id === value.project_id
      //   );
      //   workOrderList?.map(async (workOrderData, index) => {
      //     const { status, ...data } = workOrderData;
      //     const payLoad = {
      //       work_order_id: workOrderData.work_order_id,
      //       description: workOrderData.description,
      //       images: workOrderData.images,
      //       planner_remark: workOrderData.planner_remark,
      //       project_id: workOrderData.project_id,
      //       start_date: workOrderData.start_date,
      //       end_date: workOrderData.end_date,
      //       production_remark: value.production_remark,
      //       status: value.status,
      //     };
      //     status === "Released" &&
      //       (await updateWorkOrder({ id: workOrderData.id, ...payLoad }));
      //   });
      //   var resourceWorkOrderList = resourceWorkOrder?.filter(
      //     (info) => info.project_id === value.project_id
      //   );
      //   resourceWorkOrderList?.map(async (resourceWorkData, index) => {
      //     const payLoad = {
      //       estimated_hour: resourceWorkData.estimated_hour,
      //       bench_mark_measure: resourceWorkData.bench_mark_measure,
      //       bench_mark_unit: resourceWorkData.bench_mark_unit,
      //       remark: resourceWorkData.remark,
      //       required_quantity: resourceWorkData.required_quantity,
      //       sqNumber: resourceWorkData.sqNumber,
      //       status: value.status,
      //       ballance_hour: resourceWorkData.ballance_hour,
      //       ballanced_quantity: resourceWorkData.ballanced_quantity,
      //       employee_id: resourceWorkData.employee_id,
      //       endDate: resourceWorkData.endDate,
      //       actual_hour: resourceWorkData.actual_hour,
      //       forman: resourceWorkData.forman,
      //       project_id: resourceWorkData.project_id,
      //       resourceId: resourceWorkData.resourceId,
      //       prepared_quantity: resourceWorkData.prepared_quantity,
      //       startDate: resourceWorkData.startDate,
      //       work_order_id: resourceWorkData.work_order_id,
      //       quantity_unit: resourceWorkData.quantity_unit,
      //     };

      //     const { status, ...data } = resourceWorkData;
      //     status === "Released" &&
      //       (await updateResourceWorkOrder({
      //         id: resourceWorkData.id,
      //         ...payLoad,
      //       }));
      //   });
      // }
      // return deleteCode;
      return new Promise(async (resolve, reject) => {
        try {
          const data = await getAllLabourCard();
          const labourCards = JSON.parse(data.data);

          const filterLabourCards = labourCards.filter(
            (val: any) => val.project_id === value.project_id
          );
          if (filterLabourCards.length > 0) {
            if (value.status === "Unreleased")
              reject(
                new Error(
                  "ProjectId existing in Labour card.Unable to edit status"
                )
              );
          } else {
            const deleteCode: any = await updateProject(value);
            resolve(deleteCode);
            if (value.status !== "Released") {
              var workOrderList = workOrders?.filter(
                (info) => info.project_id === value.project_id
              );
              workOrderList?.map(async (workOrderData, index) => {
                const { status, ...data } = workOrderData;
                const payLoad = {
                  work_order_id: workOrderData.work_order_id,
                  description: workOrderData.description,
                  images: workOrderData.images,
                  planner_remark: workOrderData.planner_remark,
                  project_id: workOrderData.project_id,
                  start_date: workOrderData.start_date,
                  end_date: workOrderData.end_date,
                  production_remark: value.production_remark,
                  status: value.status,
                };
                status === "Released" &&
                  (await updateWorkOrder({ id: workOrderData.id, ...payLoad }));
              });
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
            ["projects", "work-orders", "resource-work-orders"].map(
              (info, index) => {
                queryClient.invalidateQueries({
                  queryKey: [info],
                });
              }
            );
            const updatedValue = JSON.parse(value.data);
            var startDate = updatedValue?.start_date!.toString().split("-");
            var endDate = updatedValue?.end_date!.toString().split("-");
            setDateRange({
              from: new Date(`${startDate[1]}-${startDate[0]}-${startDate[2]}`),
              to: new Date(`${endDate[1]}-${endDate[0]}-${endDate[2]}`),
            });
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
    //   ["projects", "work-orders", "resource-work-orders"].map((info, index) => {
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

  const handleUpdate = (value: any) => {
    toast.promise(updateItem.mutateAsync(value), {
      loading: "Loading...",
      success: "Project Updated successfully!",
      error: "Error updating project - Contact the admin",
      position: "top-right",
      dismissible: true,
    });
  };

  return (
    <>
      <TbEdit
        onClick={() => {
          if (
            row.original.status !== "Closed" &&
            row.original.status !== "Canceled"
          ) {
            return ref.current?.click();
          }
          return toast.error(
            `Project ${data.project_id} is Closed / Canceled, Contact to the Super Admin`,
            {
              position: "top-right",
              dismissible: true,
            }
          );
        }}
      />
      <Dialog>
        <DialogTrigger ref={ref}></DialogTrigger>
        <DialogContent
          className="sm:max-w-[500px]"
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
              heading="Customer Name"
              value={data.customer_name}
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
                  // setDateRange(value);
                }}
                selectedData={dateRange}
                disabled={[]}
                tab="planner"
                file="project"
                matcher={{
                  from: data.start_date!,
                  to: data.end_date!,
                }}
              />
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
                  <SelectItem value="Unreleased" className="text-red-500">
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
                  // updateItem.mutate(payLoad);
                  handleUpdate(payLoad);
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

export const projectColumns: ColumnDef<ProjectData>[] = [
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
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
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
    ),
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },
  {
    accessorKey: "estimateHour",
    header: "Estimate Hrs",
    cell: ({ row }) => {
      const estimate = parseFloat(row.original.estimateHour);
      return <p>{estimate.toFixed(2)}</p>;
    },
  },
  {
    accessorKey: "actualHour",
    header: "Actual Hrs",
    cell: ({ row }) => {
      const actual = parseFloat(row.original.actualHour);
      return <p>{actual.toFixed(2)}</p>;
    },
  },
  {
    accessorKey: "ballanceHour",
    header: "Balance Hrs",
    cell: ({ row }) => {
      const estimate = parseFloat(row.original.estimateHour);
      const actual = parseFloat(row.original.actualHour);
      const balance = estimate - actual;
      return (
        <p className={`${balance > 0 ? "text-inherit" : "text-red-500"}`}>
          {balance.toFixed(2)}
        </p>
      );
    },
  },
  {
    accessorKey: "planner_remark",
    header: "Planner Remarks",
    cell: ({ row }) =>
      row.original.planner_remark && (
        <div className="flex justify-start items-center">
          {row.original.planner_remark.substring(0, 30)}{" "}
          {row.original.planner_remark.length > 30 && "..."}
          {row.original.planner_remark.length > 30 && (
            <Popover>
              <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
                <RxCaretSort className="text-theme" size={20} />
              </PopoverTrigger>

              <PopoverContent className="w-[400px] ">
                <p className="mb-2 text-bold">Planner Remark:</p>
                <p className="text-sm text-neutral-500">
                  {row.original.planner_remark}
                </p>
              </PopoverContent>
            </Popover>
          )}
        </div>
      ),
  },
  {
    accessorKey: "production_remark",
    header: "Production Remarks",
    cell: ({ row }) =>
      row.original.production_remark && (
        <div className="flex justify-start items-center">
          {row.original.production_remark.substring(0, 30)}{" "}
          {row.original.production_remark.length > 30 && "..."}
          {row.original.production_remark.length > 30 && (
            <Popover>
              <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
                <RxCaretSort className="text-theme" size={20} />
              </PopoverTrigger>

              <PopoverContent className="w-[400px] ">
                <p className="mb-2 text-bold">Production Remark:</p>
                <p className="text-sm text-neutral-500">
                  {row.original.production_remark}
                </p>
              </PopoverContent>
            </Popover>
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
