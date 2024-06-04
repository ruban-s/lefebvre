"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ProjectData,
  ResourceWorkOdderData,
  UserData,
  WorkOrderData,
} from "@/types";
import { useResourceWorkOrderStore } from "@/state";

import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { TbEdit } from "react-icons/tb";
import { IoIosWarning, IoMdClose } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteResourceWorkOrder,
  updateResourceWorkOrder,
} from "@/data/resource-work-order";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverClose, PopoverTrigger } from "@radix-ui/react-popover";
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
import { getAllWorkOrder } from "@/data/work-order";
import { getAllProject } from "@/data/projects";
import StatusBadge from "@/components/common/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { getAllUser } from "@/data/user";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAllLabourCard } from "@/data/labour-card";

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
    header: "Work Order Id",
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
  },
  {
    accessorKey: "bench_mark_unit",
    header: "Bench Mark Unit",
  },
  {
    accessorKey: "estimated_hour",
    header: "Estimated Hours",
  },

  {
    accessorKey: "required_quantity",
    header: "Required Quantity",
  },
  {
    accessorKey: "quantity_unit",
    header: "Quantity Unit",
  },

  {
    accessorKey: "remark",
    header: "Planner Remark",
    cell: ({ row }) =>
      row.original.remark && (
        <div className="flex justify-start items-center">
          {row.original.remark.substring(0, 30)}{" "}
          {row.original.remark.length > 30 && "..."}
          {row.original.remark.length > 30 && (
            <Popover>
              <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
                <RxCaretSort className="text-theme" size={20} />
              </PopoverTrigger>

              <PopoverContent className="w-[400px] ">
                <p className="mb-2 text-bold">Planner Remark:</p>
                <p className="text-sm text-neutral-500">
                  {row.original.remark}
                </p>
              </PopoverContent>
            </Popover>
          )}
        </div>
      ),
  },
  {
    accessorKey: "production_remark",
    header: "Production Remark",
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
  const [foremans, setFormans] = useState<UserData[]>([]);
  const ref = useRef<HTMLButtonElement>(null);

  const fetchData = async () => {
    const data = await getAllUser();
    const parsedData = JSON.parse(data.data);
    const AssignedForman = parsedData.filter((data: any) =>
      row.original.forman.includes(data.id.toString())
    );
    setFormans(AssignedForman);
  };

  useEffect(() => {
    fetchData();
  }, [row.original.forman]);

  const payLoad = {
    estimated_hour: data.estimated_hour,
    bench_mark_measure: data.bench_mark_measure,
    bench_mark_unit: data.bench_mark_unit,
    remark: data.remark,
    required_quantity: data.required_quantity,
    production_remark: data.production_remark,
    sqNumber: data.sqNumber,
    status: data.status,
    ballance_hour: data.ballance_hour,
    ballanced_quantity: data.ballanced_quantity,
    employee_id: data.employee_id,
    endDate: data.endDate,
    actual_hour: data.actual_hour,
    forman: foremans.map(({ id, ...data }) => `${id}`),
    attachment: data.attachment,
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
      // console.log({
      //   id: data.id,
      //   ...value,
      // });
      // const deleteCode: any = await updateResourceWorkOrder({
      //   id: data.id,
      //   ...value,
      // });
      // return deleteCode;
      return new Promise(async (resolve, reject) => {
        try {
          const labourCardData = await getAllLabourCard();
          const labourCards = JSON.parse(labourCardData.data);
          const filterLabourCards = labourCards.filter((val: any) => {
            return (
              val.project_id === value.project_id &&
              val.work_order_id === value.work_order_id &&
              val.resource_id === value.resourceId &&
              val.sq_no === value.sq_no
            );
          });
          if (filterLabourCards.length > 0) {
            reject(new Error("WorkOrderId existing in Labour card"));
          } else {
            const deleteCode: any = await updateResourceWorkOrder({
              id: data.id,
              ...value,
            });
            queryClient.invalidateQueries({
              queryKey: ["resource-work-orders"],
            });
            resolve(deleteCode);
          }
        } catch (err) {
          reject(err);
        }
      });
    },
    // onSuccess: (value) => {
    //   if (
    //     value?.status ||
    //     value?.message === `For input string: ""` ||
    //     value?.message === `For input string: "[]"`
    //   ) {
    //     if (value?.message === `For input string: ""`) {
    //       toast.success(`Data updated successfully!`, {
    //         description: `Data updated successfully!`,
    //         position: "top-right",
    //         dismissible: true,
    //       });
    //     } else if (value?.message === `For input string: ""`) {
    //       toast.success(`Data updated successfully!`, {
    //         description: `Data updated successfully!`,
    //         position: "top-right",
    //         dismissible: true,
    //       });
    //     } else {
    //       toast.success(`${value.message}`, {
    //         description: `${value.message}`,
    //         position: "top-right",
    //         dismissible: true,
    //       });
    //     }
    //   } else {
    //     toast.error(`Something went wrong`, {
    //       description: "Data not updated contact the admin",
    //       position: "top-right",
    //       dismissible: true,
    //     });
    //   }
    //   queryClient.invalidateQueries({
    //     queryKey: ["resource-work-orders"],
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
  const { data: workOrders } = useQuery({
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
  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await getAllUser();
      return JSON.parse(data.data) as UserData[];
    },
  });

  const handleUpdate = (value: any) => {
    toast.promise(updateItem.mutateAsync(value), {
      loading: "Loading...",
      success: "ResourceId Updated successfully!",
      error: "Error updating ResourceId - Contact the admin",
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
      />
      <Dialog>
        <DialogTrigger ref={ref}></DialogTrigger>
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
              <div className="mb-1">Remark</div>
              <Input disabled value={data.remark} />
            </div>
            <div className="items-center gap-4">
              <div className="mb-1">Foremans</div>
              <Popover>
                {foremans.length < 1 && (
                  <PopoverTrigger asChild className="w-full col-span-2">
                    <div className="w-full border border-1 p-2 py-3 rounded-md border-neutral-100 text-sm">
                      Select Foremans
                    </div>
                  </PopoverTrigger>
                )}
                {foremans.length > 0 && (
                  <PopoverTrigger asChild className="w-full col-span-2">
                    <div className="w-full flex flex-row flex-wrap mt-1 h-auto border border-1 p-2 py-3 rounded-md border-neutral-100 text-sm">
                      {foremans.map((info, index) => {
                        return (
                          <div
                            key={index}
                            className="bg-neutral-400 flex flex-row justify-center items-center  rounded-sm shadow-sm">
                            <div className="rounded-sm w-auto px-2 text-white ml-1 flex justify-between ">
                              {info.username}
                            </div>
                            <IoMdClose
                              className="ml-1 cursor-pointer text-white "
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormans((formans) =>
                                  formans.filter(
                                    (data) => data.username !== info.username
                                  )
                                );
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </PopoverTrigger>
                )}
                <PopoverContent>
                  <Command>
                    <CommandInput
                      placeholder="Search Foreman..."
                      className="h-9"
                    />
                    <CommandEmpty>No Foreman found.</CommandEmpty>
                    <CommandList onSelect={() => alert("hi")}>
                      {user?.map((info, index) => {
                        if (info.role_name === "Foreman")
                          return (
                            <CommandItem
                              className="cursor-pointer"
                              key={index}
                              onSelect={(value) => {
                                var isSelectedForman = foremans.filter(
                                  (formans) =>
                                    formans.username === info.username
                                );

                                if (isSelectedForman.length > 0) {
                                  return;
                                }
                                var filterForeman: UserData[] = user.filter(
                                  (data) => data.username === info.username
                                );
                                if (filterForeman.length > 0) {
                                  setFormans((formans) => [
                                    ...formans,
                                    filterForeman[0],
                                  ]);
                                }
                              }}>
                              <PopoverClose>
                                <p className="text-sm">{info.username}</p>
                              </PopoverClose>
                            </CommandItem>
                          );
                      })}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="col-span-2">
              <p> Production Remarks:</p>
              <Textarea
                defaultValue={payLoad.production_remark}
                onChange={(value) => {
                  payLoad.production_remark = value.target.value;
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
              <Button variant={"secondary"} onClick={() => fetchData()}>
                Close
              </Button>
            </DialogClose>
            {payLoad.forman.length === 0 ? (
              <Button
                variant={"default"}
                className="bg-theme"
                onClick={() => {
                  toast.error(`Forman field is mandatory`, {
                    position: "top-right",
                    dismissible: true,
                  });
                }}>
                Save
              </Button>
            ) : (
              <DialogClose>
                <Button
                  variant={"default"}
                  className="bg-theme"
                  onClick={() => {
                    // updateItem.mutate(payLoad);
                    handleUpdate(payLoad);
                    setFormans([]);
                  }}>
                  Save
                </Button>
              </DialogClose>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
