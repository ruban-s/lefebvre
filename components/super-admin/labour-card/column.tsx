"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { LabourData, ProjectData } from "@/types";
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
import StatusBadge from "@/components/common/status-badge";
import ViewTabField from "@/components/common/viewTabField";
import { labourCardMaintanceField } from "@/config/const";

// export const CellFunction = ({ row }: any) => {
//   const queryClient = useQueryClient();
//   const project = row.original;
//   const setProject = useProjectStore((state: any) => state.setProject);
//   const handleUpdateUser = () => {
//     setProject({ ...project });
//   };
//   const deleteItem = useMutation({
//     mutationFn: async (value: any) => {
//       const deleteCode: any = await deleteProject(value);
//       return deleteCode;
//     },
//     onSuccess: (value) => {
//       if (value?.status) {
//         toast.success(`${value.message}`, {
//           description: `${value.message}`,
//           position: "top-right",
//           dismissible: true,
//         });
//       } else {
//         toast.error(`Something went wrong`, {
//           description: "Data not updated contact the admin",
//           position: "top-right",
//           dismissible: true,
//         });
//       }
//       queryClient.invalidateQueries({
//         queryKey: ["projects"],
//       });
//     },
//     onError: (value) => {
//       toast.error(`Something went wrong`, {
//         position: "top-right",
//         dismissible: true,
//       });
//     },
//   });

//   return (
//     <TableActionButtonComponents
//       primaryLable="Edit"
//       primaryAction={() => {
//         handleUpdateUser();
//       }}
//       primaryIcon={TbEdit}
//       alertlable="Delete"
//       alertlableIcon={MdDelete}
//       alertheading=" Are you absolutely sure?"
//       alertIcon={IoIosWarning}
//       alertactionLable="Delete"
//       alertcloseAllFunction={() => {}}
//       values={project}
//       alertdescription="  This action cannot be undone. This will permanently delete
//                     your data and remove from our server."
//       alertactionFunction={() => {
//         deleteItem.mutate(`${project.id}`);
//       }}
//     />
//   );
// };
// export const UpdateStatus = ({ row }: any) => {
//   const data = row.original;

//   const [dateRange, setDateRange] = useState<DateRange | undefined>({
//     from: new Date(data.start_date),
//     to: new Date(data.end_date),
//   });

//   const payLoad = {
//     id: data.id,
//     project_id: data.project_id,
//     customer_name: data.customer_name,
//     description: data.description,
//     images: data.images,
//     planner_remark: data.planner_remark,
//     start_date: data.start_date,
//     end_date: data.end_date,
//     status: data.status,
//   };
//   const queryClient = useQueryClient();
//   const updateItem = useMutation({
//     mutationFn: async (value: any) => {
//       const deleteCode: any = await updateProject(value);
//       return deleteCode;
//     },
//     onSuccess: (value) => {
//       if (value?.status) {
//         toast.success(`${value.message}`, {
//           description: `${value.message}`,
//           position: "top-right",
//           dismissible: true,
//         });
//       } else {
//         toast.error(`Something went wrong`, {
//           description: "Data not updated contact the admin",
//           position: "top-right",
//           dismissible: true,
//         });
//       }
//       queryClient.invalidateQueries({
//         queryKey: ["projects"],
//       });
//       setDateRange(undefined);
//     },
//     onError: (value) => {
//       console.log(value);
//       toast.error(`Something went wrong`, {
//         position: "top-right",
//         dismissible: true,
//       });
//     },
//   });
//   return (
//     <Dialog>
//       <DialogTrigger>
//         <TbEdit />
//       </DialogTrigger>
//       <DialogContent
//         className="sm:max-w-[425px]"
//         onInteractOutside={(e) => {
//           e.preventDefault();
//         }}>
//         <DialogHeader>
//           <DialogTitle>Change Status</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className=" grid grid-row-4 items-center gap-4">
//             <div>Status</div>

//             <Select
//               // value={payLoad.status}
//               onValueChange={(value) => {
//                 payLoad.status = value;
//               }}>
//               <SelectTrigger className="w-[200px]">
//                 <SelectValue placeholder={row.original.status} />
//               </SelectTrigger>
//               <SelectContent className="hovrer:none">
//                 <SelectItem value="Closed">Closed</SelectItem>
//                 <SelectItem value="Unreleased" className="text-red-500">
//                   Unreleased
//                 </SelectItem>
//                 <SelectItem value="Released" className="text-green-500">
//                   Released
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid grid-row-4   items-center gap-4">
//             <div>Start Date - End Date</div>
//             <DatePickerWithRange
//               onselect={(value: DateRange) => {
//                 payLoad.start_date = format(value?.from!, "dd-LL-y");
//                 payLoad.end_date = format(value?.to!, "dd-LL-y");
//               }}
//               selectedData={dateRange!}
//               disabled={[]}
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <DialogClose>
//             <Button variant={"secondary"} onClick={() => {}}>
//               Close
//             </Button>
//           </DialogClose>
//           <DialogClose>
//             <Button
//               variant={"default"}
//               className="bg-theme"
//               onClick={() => {
//                 updateItem.mutate(payLoad);
//               }}>
//               Save
//             </Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

export const projectColumns: ColumnDef<LabourData>[] = [
  {
    accessorKey: "employee_id",
    header: "Employee Id",
  },
  {
    accessorKey: "name",
    header: "Employee Name",
  },
  {
    accessorKey: "designation_id",
    header: "Designation",
  },
  {
    accessorKey: "gl_code",
    header: "GL Code",
  },
  {
    accessorKey: "gl_description",
    header: "GL Description",
  },
  {
    accessorKey: "project_id",
    header: "Project Id",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.project_id ? "--" : <p>{row.original.project_id}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: "work_order_id",
    header: "Work Order Id",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.work_order_id ? (
            "--"
          ) : (
            <p>{row.original.work_order_id}</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "resource_id",
    header: "Resource Id",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.resource_id ? "--" : <p>{row.original.resource_id}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: "punch_in_time",
    header: "In Time",
  },
  {
    accessorKey: "punch_out_time",
    header: "Out Time",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.punch_out_time ? (
            "--"
          ) : (
            <p>{row.original.punch_out_time}</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "forman_id",
    header: "Forman",
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

const UpdateStatus = ({ row }: any) => {
  const data = row.original;
  return (
    <Dialog>
      <DialogTrigger>
        <TbEdit />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-full max-h-[900px] overflow-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3  gap-2">
          {labourCardMaintanceField.map((dataValue, index) => {
            if (
              dataValue === "is_production_editable" ||
              dataValue === "is_super_admin_editable" ||
              dataValue === "break_type" ||
              dataValue === "gl_code"
            ) {
              return null;
            }
            return (
              <ViewTabField
                key={index}
                heading={
                  dataValue.replaceAll("_", " ").charAt(0).toUpperCase() +
                  dataValue
                    .replaceAll("_", " ")
                    .slice(1)
                    .replace(/([a-z])([A-Z])/g, "$1 $2")
                }
                value={data[`${dataValue}`]}
                isInput
              />
            );
          })}
          <ViewTabField
            heading={"gl_code"}
            value={data.gl_code !== "" ? data.gl_code : "--"}
            isInput
          />
          <ViewTabField
            heading={"gl_description"}
            value={data.gl_description !== "" ? data.gl_description : "--"}
            isInput
          />
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
              // onClick={() => {
              //   console.log(toogle);
              //   payLoad.is_production_editable = toogle;
              //   console.log(payLoad);
              //   updateItem.mutate(payLoad);
              // }}>
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
