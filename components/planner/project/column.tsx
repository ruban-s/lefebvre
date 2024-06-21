"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProjectData } from "@/types";
import { useProjectStore } from "@/state";

import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/data/projects";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { RxCaretSort } from "react-icons/rx";
import Link from "next/link";
import { parse } from "date-fns";
import { getAllLabourCard } from "@/data/labour-card";
import {
  deleteResourceWorkOrder,
  getAllResourceWorkOrder,
} from "@/data/resource-work-order";
import { deleteWorkOrder, getAllWorkOrder } from "@/data/work-order";

export const CellFunction = ({ row }: any) => {
  const queryClient = useQueryClient();
  const rowData = row.original;

  const project = [
    { name: "Id", value: rowData.id, cover: "half" },
    { name: "Project Id", value: rowData.project, cover: "half" },
    { name: "Customer Name", value: rowData.customer_name, cover: "full" },
    { name: "Description", value: rowData.description, cover: "full" },
    { name: "Start Date", value: rowData.start_date, cover: "half" },
    { name: "End Date", value: rowData.end_date, cover: "half" },
    { name: "Estimate Hrs", value: rowData.estimateHour, cover: "half" },
    { name: "Actual Hrs", value: rowData.actualHour, cover: "half" },
    {
      name: "Balance Hrs",
      value: (
        parseFloat(rowData.estimateHour) - parseFloat(rowData.actualHour)
      ).toFixed(2),
      cover: "full",
    },
    { name: "Planner Remark", value: rowData.planner_remark, cover: "full" },
    { name: "Status", value: rowData.status, cover: "half" },
  ];

  const setProject = useProjectStore((state: any) => state.setProject);
  const handleUpdateUser = () => {
    setProject({ ...rowData });
  };
  const deleteItem = useMutation({
    mutationFn: async ({ id, projectId }: { id: any; projectId: any }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await getAllLabourCard();
          const labourCards = JSON.parse(data.data);

          const filterLabourCards = labourCards.filter(
            (val: any) => val.project_id === projectId
          );

          if (filterLabourCards.length > 0) {
            reject();
          } else {
            const Resources = await getAllResourceWorkOrder();
            const parsedResources = JSON.parse(Resources.data);
            for (const item of parsedResources) {
              if (item.project_id === projectId) {
                await deleteResourceWorkOrder(item.id);
              }
            }
            const workOrder = await getAllWorkOrder();
            const parsedWorkOrder = JSON.parse(workOrder.data);
            for (const item of parsedWorkOrder) {
              if (item.project_id === projectId) {
                await deleteWorkOrder(item.id);
              }
            }
            const deleteCode = await deleteProject(id);
            ["projects", "work-orders", "resource-work-orders"].map(
              (info, index) => {
                queryClient.invalidateQueries({
                  queryKey: [info],
                });
              }
            );
            // queryClient.invalidateQueries({
            //   queryKey: ["projects"],
            // });
            resolve({ deleteCode });
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
    //   } else if (!value?.status && value?.message) {
    //     toast.error(`Unable to delete`, {
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
        id: rowData.id,
        projectId: rowData.project_id,
      }),
      {
        loading: "Loading...",
        success: "Project deleted successfully!",
        error: "Error deleting project - Contact the admin",
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
      dynamicValues={project}
      alertdescription="This action cannot be undone. This will permanently delete
                    your data and remove from our server."
      alertactionFunction={handleDelete}
    />
  );
};

export const projectColumns: ColumnDef<ProjectData>[] = [
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
    accessorKey: "requiredQuantity",
    header: "Required Qty",
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
      console.log(row.original);
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
