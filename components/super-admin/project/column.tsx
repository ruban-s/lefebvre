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
import { FaFileCsv } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXlsx } from "react-icons/bs";
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
import { useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
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
    from: new Date(data.start_date),
    to: new Date(data.end_date),
  });

  const payLoad = {
    id: data.id,
    project_id: data.project_id,
    customer_name: data.customer_name,
    description: data.description,
    images: data.images,
    planner_remark: data.planner_remark,
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
      const deleteCode: any = await updateProject(value);
      console.log(value.status);
      if (value.status === "Closed" || value.status === "Canceled") {
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
            status: value.status,
          };
          workOrderData.status !== value.status &&
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
      ["projects", "work-orders", "resource-work-orders"].map((info, index) => {
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
  return (
    <>
      {/* <TbEdit
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
      /> */}
      <Dialog>
        <DialogTrigger ref={ref}>
          {" "}
          <TbEdit />
        </DialogTrigger>
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
            <div className=" col-span-2">
              <div>Start Date - End Date</div>
              <DatePickerWithRange
                onselect={(value: DateRange) => {
                  payLoad.start_date = format(value?.from!, "dd-LL-y");
                  payLoad.end_date = format(value?.to!, "dd-LL-y");
                }}
                selectedData={dateRange!}
                disabled={[]}
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
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
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
    accessorKey: "planner_remark",
    header: "Planner Remarks",
    cell: ({ row }) => (
      <div className="flex justify-start items-center">
        {row.original.planner_remark.substring(0, 30)}{" "}
        {row.original.planner_remark.length > 30 && "..."}
        {row.original.planner_remark.length > 30 && (
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
    cell: ({ row }) => <StatusBadge row={row} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UpdateStatus row={row} />;
    },
  },
];
