"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { AttendanceTypeData, LabourData, ProjectData } from "@/types";
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
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { DatePickerWithRange } from "@/components/common/dateRangePicker";
import { DialogClose } from "@radix-ui/react-dialog";
import StatusBadge from "@/components/common/status-badge";
import ViewTabField from "@/components/common/viewTabField";
import { labourCardMaintanceField } from "@/config/const";
import { useForm } from "react-hook-form";
import { LabourCardSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateLabourCard } from "@/data/labour-card";
import { calculateWorkAndBreakHour } from "@/commonfunction";
import { AttendanceList } from "@/components/common/attendanceList";

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
        {row.original.gl_description.length > 0 ? (
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
];

const UpdateStatus = ({ row }: any) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [attendanceValue, setAttendanceValue] = useState<
    AttendanceTypeData | undefined
  >();
  // console.log("hi");
  console.log(row.original);
  const updateItem = useMutation({
    mutationFn: async (value: any) => {
      const {
        workHours,
        effectiveWorkHours,
        breakHours,
        effectiveWorkHourFormat,
      } = calculateWorkAndBreakHour({
        punchInTime: value.punch_in_time,
        punchOutTime: value.punch_out_time,
        shiftType: row.original.shift_type,
        breakType: row.original.break_type,
      });
      const updateCode: any = await updateLabourCard({
        ...value,
        labor_type_id: value.gl_code ? "Indirect" : "Direct",
        current_shift_name: row.original.current_shift_name,
        current_shift_id: row.original.current_shift_id,
        labor_id: row.original.labor_id,
        break_type: row.original.break_type,
        forman_name: row.original.forman_name,
        status: row.original.status,
        image_path: row.original.image_path,
        quantity: row.original.quantity,
        shift_type: row.original.shift_type,
        gl_code: value.gl_code,
        gl_description: value.gl_description,
        forman_id: row.original.forman_id,
        work_hours: workHours,
        effective_work_hour: effectiveWorkHours,
        break_duration: breakHours,
        effective_work_hour_format: effectiveWorkHourFormat,
      });
      return updateCode;
    },
    onSuccess: (value) => {
      if (value?.status) {
        console.log("triggering");
        toast.success(`${value.message}`, {
          description: `${value.message}`,
          position: "top-right",
          dismissible: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["labour-card"],
        });
        setOpen(false);
      } else {
        toast.error(`Something went wrong`, {
          description: "Data not updated contact the admin",
          position: "top-right",
          dismissible: true,
        });
      }
    },
    onError: (value) => {
      console.log(value);
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const form = useForm<z.infer<typeof LabourCardSchema>>({
    resolver: zodResolver(LabourCardSchema),
    defaultValues: {
      name: "",
      punch_in_time: "",
      punch_out_time: "",
      designation_id: "",
      employee_id: "",
      forman_id: "",
      attendance_type: "",
      remark: "",
      gl_code: "",
      sq_no: "",
      // system_in_time: "",
      // system_out_time: "",
      work_hours: "",
      break_duration: "",
      effective_work_hour: "",
      effective_work_hour_format: "",
      prepared_quantity: "",
      shift_date: "",
    },
  });
  const data = row.original;

  type LabourCardSchemaType = z.infer<typeof LabourCardSchema>;

  const labourCardMaintainField: (keyof LabourCardSchemaType)[] = [
    "id",
    "employee_id",
    "name",
    "designation_id",
    "attendance_type",
    "gl_code",
    "gl_description",
    "project_id",
    "work_order_id",
    "resource_id",
    "sq_no",
    "punch_in_time",
    "punch_out_time",
    // "system_in_time",
    // "system_out_time",
    "work_hours",
    "break_duration",
    "effective_work_hour",
    "effective_work_hour_format",
    "prepared_quantity",
    "shift_start_time",
    "shift_end_time",
    "shift_date",
    "forman_name",
    "remark",
  ];

  const handleSubmit = (values: z.infer<typeof LabourCardSchema>) => {
    updateItem.mutate({ ...values });
  };

  useEffect(() => {
    labourCardMaintainField.forEach((field) => {
      if (field === "attendance_type") {
        setAttendanceValue(data[field]);
      }
      if (data[field] !== undefined && data[field] !== "--") {
        form.setValue(field, data[field]);
      }
    });
  }, [data, form]);

  const hiddenArray = [
    // "system_in_time",
    // "system_out_time",
    "name",
    "effective_work_hour",
    "effective_work_hour_format",
    "shift_start_time",
    "shift_end_time",
    "shift_date",
    "break_duration",
    "designation_id",
    "id",
    "employee_id",
    "work_hours",
  ];

  const chooseAttendanceType = (value: AttendanceTypeData) => {
    setAttendanceValue(value);
    form.setValue("attendance_type", value?.name);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TbEdit />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-full max-h-[900px] overflow-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
              {labourCardMaintainField.map((val, index) => {
                const title = val.replaceAll("_", " ");
                // console.log(val);
                if (val === "attendance_type") {
                  return (
                    <div key={index}>
                      <FormField
                        name="attendance_type"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attendance</FormLabel>
                            <FormControl>
                              <AttendanceList
                                value={attendanceValue}
                                onChange={chooseAttendanceType}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                }
                return (
                  <div key={index}>
                    <FormField
                      name={val}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize font-black text-md">
                            {title}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder={title as any}
                              className=" border-2 border-gray-300 focus-visible:border-0"
                              disabled={hiddenArray.includes(val)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              })}
            </div>
            <DialogFooter className="sticky bottom-0 left-0">
              <DialogClose>
                <Button variant={"secondary"} type="reset">
                  Close
                </Button>
              </DialogClose>
              {/* <DialogClose> */}
              <Button variant={"default"} className="bg-theme" type="submit">
                Save
              </Button>
              {/* </DialogClose> */}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
