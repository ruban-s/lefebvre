"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectData } from "@/types";
import { useProjectStore } from "@/state";

import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { DatePickerWithRange } from "@/components/common/dateRangePicker";
import { DialogClose } from "@radix-ui/react-dialog";

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
  const updateItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await updateProject(value);
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
    <Dialog>
      <DialogTrigger>
        <TbEdit />
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <DialogHeader>
          <DialogTitle>Change Status</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className=" grid grid-row-4 items-center gap-4">
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
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="Unreleased" className="text-red-500">
                  Unreleased
                </SelectItem>
                <SelectItem value="Released" className="text-green-500">
                  Released
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-row-4   items-center gap-4">
            <div>Start Date - End Date</div>
            <DatePickerWithRange
              onselect={(value: DateRange) => {
                payLoad.start_date = format(value?.from!, "LLL dd, y");
                payLoad.end_date = format(value?.to!, "LLL dd, y");
              }}
              selectedData={dateRange!}
              disabled={[]}
            />
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
    header: "Remarks",
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
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => <UpdateStatus row={row} />,
  // },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={`cursor-pointer rounded-md ${
          row.original.status === "Released"
            ? "bg-green-500"
            : row.original.status === "Unreleased"
            ? "bg-red-500"
            : "bg-black"
        }`}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UpdateStatus row={row} />;
    },
  },
];
