"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LabourData, ProjectData, ShiftData } from "@/types";

import { TbEdit } from "react-icons/tb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Delete, MoreHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { DatePickerWithRange } from "@/components/common/dateRangePicker";
import { DialogClose } from "@radix-ui/react-dialog";
import StatusBadge from "@/components/common/status-badge";
import ViewTabField from "@/components/common/viewTabField";
import { Switch } from "@/components/ui/switch";
import { deleteLabourCard, updateLabourCard } from "@/data/labour-card";
import { getAllShift } from "@/data/shift";
import { labourCardMaintanceField } from "@/config/const";
import { MdDelete } from "react-icons/md";
import { RxCaretSort } from "react-icons/rx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DeleteCard = ({ row }: { row: any }) => {
  const queryClient = useQueryClient();
  const deleteItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await deleteLabourCard(value);
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
        queryKey: ["labour-card"],
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
    <button
      className="text-red-600"
      onClick={() => deleteItem.mutate(row.original.id)}>
      <MdDelete />
    </button>
  );
};

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
export const UpdateStatus = ({ row }: any) => {
  const data = row.original;
  const ref = useRef<HTMLButtonElement>(null);
  const [toogle, setToogle] = useState<boolean>(data.is_production_editable);

  useEffect(() => {
    // var startDate = data?.start_date!.toString().split("-");
    // var endDate = data?.end_date!.toString().split("-");
    // setDateRange({
    //   from: new Date(`${startDate[1]}-${startDate[0]}-${startDate[2]}`),
    //   to: new Date(`${endDate[1]}-${endDate[0]}-${endDate[2]}`),
    // });
  }, []);
  const payLoad = {
    attendance_type: data.attendance_type,
    break_type: data.break_type,
    createdDate: data.createdDate,
    designation_id: data.designation_id,
    employee_id: data.employee_id,
    forman: data.forman_id,
    gl_code: data.gl_code,
    id: data.id,
    image_path: data.image_path,
    labor_id: data.labor_id,
    labor_type_id: data.labor_type_id,
    name: data.name,
    project_id: data.project_id,
    is_production_editable: data.is_production_editable,
    is_super_admin_editable: data.is_super_admin_editable,
    punch_in_time: data.punch_in_time,
    punch_out_time: data.punch_out_time,
    quantity: data.quantity,
    remark: data.remark,
    resource_id: data.resource_id,
    shift_end_time: data.shift_end_time,
    shift_start_time: data.shift_start_time,
    status: data.status,
    updatedDate: data.updatedDate,
    work_order_id: data.work_order_id,
  };
  const queryClient = useQueryClient();

  const updateItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await updateLabourCard(value);
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
      ["labour-card"].map((info, index) => {
        queryClient.invalidateQueries({
          queryKey: [info],
        });
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
  const shift = useQuery({
    queryKey: ["shift"],
    queryFn: async () => {
      const data = await getAllShift();
      return JSON.parse(data.data) as ShiftData[];
    },
  });
  function getTimeDifference(startTime: any, endTime: any) {
    const start = startTime.split(":");
    const end = endTime.split(":");
    return `${Math.abs(Number(start[0] - end[0]))}:${Math.abs(
      Number(start[1] - end[1])
    )}`;
  }
  function breakDuration(
    startTime: any,
    endTime: any,
    shiftStart: any,
    shiftEnd: any
  ) {
    shift.data?.map((info: ShiftData, index) => {
      if (
        info.shift_end_time === shiftStart &&
        info.shift_end_time === shiftEnd
      ) {
        console.log(info);
      }
    });

    return "--";
  }
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
          className="sm:max-w-[800px] h-full max-h-[900px] overflow-auto"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}>
          <DialogHeader className="py-2 w-full bg-theme flex justify-center items-center rounded-lg">
            <DialogTitle className="text-white">Labour Card</DialogTitle>
          </DialogHeader>
          <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3  gap-5">
            {labourCardMaintanceField.map((dataValue, index) => {
              // if (
              //   dataValue === "is_production_editable" ||
              //   dataValue === "is_super_admin_editable" ||
              //   dataValue === "break_type" ||
              //   dataValue === "gl_code" ||
              //   dataValue === "gl_description"
              // ) {
              //   return null;
              // }
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
                  value={
                    data[`${dataValue}`] !== "" ? data[`${dataValue}`] : "--"
                  }
                  isInput
                />
              );
            })}
            {/* <ViewTabField
              heading={"gl_code"}
              value={data.gl_code !== "" ? data.gl_code : "--"}
              isInput
            />
            <ViewTabField
              heading={"gl_description"}
              value={data.gl_description !== "" ? data.gl_description : "--"}
              isInput
            /> */}
            {/* <ViewTabField
              heading={"Effective Work Hour"}
              value={"--"}
              isInput
            />
            <ViewTabField
              heading={"Effective Work Hour Formate"}
              value={"--"}
              isInput
            /> */}

            {/* {Object.keys(data).map((dataValue, index) => {
              if (dataValue === "is_production_editable") {
                return (
                  <div className="flex items-center space-x-2" key={index}>
                    <Switch
                      id={dataValue}
                      checked={toogle}
                      onCheckedChange={(e) => {
                        setToogle(e);
                      }}
                    />
                    <Label htmlFor={dataValue}>
                      {dataValue === "is_production_editable"
                        ? "Foreman Edit"
                        : "Admin Edit"}
                    </Label>
                  </div>
                );
              }
              return null;
            })} */}
            {/* <ViewTabField
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
            /> */}
          </div>
          <DialogFooter className="sticky bottom-0 left-0">
            <DialogClose>
              <Button variant={"secondary"} className="border-1">
                Close
              </Button>
            </DialogClose>
            <DialogClose>
              {/* <Button
                variant={"default"}
                className="bg-theme"
                onClick={() => {
                  console.log(toogle);
                  payLoad.is_production_editable = toogle;
                  // console.log(payLoad);
                  updateItem.mutate(payLoad);
                }}>
                Save
              </Button> */}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

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
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.gl_code ? "--" : <p>{row.original.gl_code}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: "gl_description",
    header: "GL Description",
    cell: ({ row }) => (
      <>
        {row.original.gl_description !== null &&
        row.original.gl_description.length > 0 ? (
          <div className="flex justify-start items-center">
            {row.original.gl_description.substring(0, 15)}{" "}
            {row.original.gl_description.length > 15 && "..."}
            {row.original.gl_description.length > 15 && (
              <Popover>
                <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
                  <RxCaretSort className="text-theme" size={20} />
                </PopoverTrigger>

                <PopoverContent className="w-[400px] ">
                  <p className="mb-2 text-bold">Description:</p>
                  <p className="text-sm text-neutral-500">
                    {row.original.gl_description}
                  </p>
                </PopoverContent>
              </Popover>
            )}
          </div>
        ) : (
          <div>--</div>
        )}
      </>
    ),
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
    accessorKey: "forman_name",
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
  // {
  //   id: "delete",
  //   cell: ({ row }) => {
  //     return <DeleteCard row={row} />;
  //   },
  // },
];
