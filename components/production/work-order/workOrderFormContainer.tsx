/* trunk-ignore-all(prettier) */
"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkOrderSchema } from "@/schemas/index";
import { Input } from "@/components/ui/input";
import { FaUser } from "react-icons/fa";

import { IoMdCloseCircle } from "react-icons/io";
import { FcInfo } from "react-icons/fc";

import classNames from "classnames";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWorkOrder,
  getAllWorkOrder,
  updateWorkOrder,
} from "@/data/work-order";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useWorkOrderStore } from "@/state";
import { useRouter } from "next/navigation";
import { DatePickerWithRange } from "@/components/common/dateRangePicker";
import { DateRange } from "react-day-picker";
import { format, differenceInDays, addDays } from "date-fns";
import ProjectListCombo from "../../common/projectListCombo";
import { ProjectData, WorkOrderData } from "@/types";
import { uploadImage } from "@/data/common";

const WorkOrderFormContainer = () => {
  const workOrder = useWorkOrderStore((state: any) => state.workOrder); // Accessing the workOrder object
  const removeWorkOrder = useWorkOrderStore(
    (state: any) => state.removeWorkOrder
  );
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedProject, setProject] = useState<ProjectData | undefined>();
  const [disabledDates, setDisbleDates] = useState<Date[]>([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["work-orders"],
    queryFn: async () => {
      const data = await getAllWorkOrder();
      return JSON.parse(data.data) as WorkOrderData[];
    },
  });

  const creatWorkOrder = useMutation({
    mutationFn: async (value: any) => {
      const breake = workOrder
        ? await updateWorkOrder({ id: workOrder?.id, ...value })
        : await createWorkOrder(value);
      setDateRange(undefined);
      removeWorkOrder();
      return breake;
    },
    onSuccess: (value) => {
      if (value.status) {
        toast.success(`${value.message}`, {
          description: `${value.message}`,
          position: "top-right",
          dismissible: true,
        });
        form.reset();
        setProject(undefined);
        setRange(undefined);
      } else {
        toast.error(`Something went wrong`, {
          description: `${value.message}`,
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
        description: `${value.message}`,
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const form = useForm<z.infer<typeof WorkOrderSchema>>({
    resolver: zodResolver(WorkOrderSchema),
    defaultValues: {
      project_id: "",
      work_order_id: "",
      planner_remark: "",
      start_date: "",
      status: "Unreleased",
      description: "",
      images: [],
    },
  });
  useEffect(() => {
    if (workOrder) {
      setProject(workOrder?.project_id);

      form.setValue("project_id", workOrder?.project_id!);
      form.setValue("planner_remark", workOrder?.planner_remark!);
      form.setValue("start_date", workOrder?.start_date!);
      form.setValue("end_date", workOrder?.end_date!);
      form.setValue("status", workOrder?.status!);
      form.setValue("images", workOrder?.images!);
      form.setValue(
        "work_order_id",
        workOrder?.project_id! + "-" + workOrder?.work_order_id!
      );
      form.setValue("description", workOrder?.description!);
      setDateRange({
        from: new Date(workOrder?.start_date!),
        to: new Date(workOrder?.end_date!),
      });
      // setEdit(true);
    }
  }, [workOrder]);

  const onSubmit = async (values: z.infer<typeof WorkOrderSchema>) => {
    creatWorkOrder.mutate(values);
  };
  const newData = async (value: FormData, name: string) => {
    var data = await uploadImage(value, name);
    form.setValue("images", [...form.watch("images")!, data.data]);
    console.log(data);
  };
  const chooseProject = (value: ProjectData) => {
    if (!value) {
      form.setValue("work_order_id", "");
      form.setValue("project_id", "");
      setProject(value);
      setDisbleDates([]);
      setDisbleDates([]);

      return;
    }
    form.setValue("work_order_id", value.project_id + "-");
    form.setValue("project_id", value.project_id);
    setProject(value);
    const projectWiseWorkOrders: WorkOrderData[] | undefined = data?.filter(
      (info) => info.project_id === value?.project_id
    );
    // setDisbleDates([]);
    // const workOrderDates: Date[] = [];
    // projectWiseWorkOrders?.map(({ start_date, end_date, ...info }, index) => {
    //   const days = differenceInDays(start_date, end_date);
    //   const projectDays = 0 | -days;
    //   for (let i = 0; i <= projectDays; i++) {
    //     const newdate = addDays(new Date(start_date), i);
    //     workOrderDates.push(new Date(format(newdate, "dd-LL-y")));
    //   }
    // });
    // if (workOrder) {
    //   const days = differenceInDays(workOrder?.start_date, workOrder?.end_date);
    //   const workDays = 0 | -days;
    //   for (let i = 0; i <= workDays; i++) {
    //     const newdate = addDays(new Date(workOrder?.start_date), i);

    //     workOrderDates.map((info: Date, index) => {
    //       if (info <= newdate) {
    //         workOrderDates.splice(index, 1); // Use splice() to remove the element at the found index
    //       }
    //     });
    //   }
    // }

    // setDisbleDates([...workOrderDates]);
  };

  const setRange = (data: DateRange | undefined) => {
    form.clearErrors("start_date");
    setDateRange(data);
    if (!data) {
      form.setValue("start_date", "");
      form.setValue("end_date", "");
      return;
    }
    const { from, to } = data;
    if (!from) {
      form.setValue("start_date", "");
      form.setValue("end_date", "");
      return;
    }
    if (!to) {
      form?.setValue("start_date", format(from, "dd-LL-y"));
      form?.setValue("end_date", format(from, "dd-LL-y"));
      return;
    }
    form.setValue("start_date", format(from, "dd-LL-y"));
    form.setValue("end_date", format(to, "dd-LL-y"));

    return;
  };

  return (
    <div className="w-full h-auto bg-white  shadow-sm ring-1 ring-theme rounded-sm">
      <div className="bg-theme w-full pl-2 py-2 ">
        <p className="text-lg font-bold text-white ">
          {workOrder ? "Update WorkOrder" : "Add WorkOrder "}
        </p>
      </div>
      <div className="w-[100%] ml-auto mr-auto  flex justify-center items-center   p-4 ">
        <div className="w-[100%]  flex flex-col justify-center items-center lg:justify-start lg:items-start  lg:flex-row mr-auto ">
          <Form {...form}>
            <form className=" w-full " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                <FormField
                  control={form.control}
                  name="project_id"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col w-fullh-full justify-end items-start">
                        <FormLabel className="mb-1">Project ID</FormLabel>
                        <FormControl>
                          <ProjectListCombo
                            value={selectedProject}
                            onChange={chooseProject}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="work_order_id"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Work Order id</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Work Order Id"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="planner_remark"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Planner Remark</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Planner Remark"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Start Date - End Date</FormLabel>
                        <FormControl>
                          <DatePickerWithRange
                            onselect={setRange}
                            selectedData={dateRange!}
                            fromDate={selectedProject?.start_date}
                            toDate={selectedProject?.end_date}
                            disabled={disabledDates}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          disabled
                          value={form.watch("status")}
                          onValueChange={(value) => {
                            form.clearErrors("status");
                            form.setValue("status", value);
                          }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Unreleased">
                              Unreleased
                            </SelectItem>
                            <SelectItem value="Released">Released</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Files</FormLabel>
                        <FormControl>
                          <Input
                            multiple={true}
                            type="file"
                            placeholder=""
                            onChange={(e: any) => {
                              const formData = new FormData();
                              if (!e.target?.files) return;
                              !workOrder && form.setValue("images", []);
                              Array.from(
                                { length: e.target?.files.length },
                                (_, index) => index
                              ).map((info, index) => {
                                e.target?.files[index] &&
                                  formData.append(
                                    "file",
                                    e.target?.files[index] as File
                                  );
                                e.target?.files[index] &&
                                  newData(
                                    formData,
                                    e.target?.files[index].name.split(".")[0]
                                  );
                              });
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        {workOrder && (
                          <p>selected files - {form.watch("images")!.length}</p>
                        )}
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="w-full py-4  flex justify-start items-center">
                <Button type="submit" className="bg-theme">
                  {workOrder ? "Update WorkOrder" : "Add WorkOrder"}
                  <FaUser className="ml-2 text-white" size={16} />
                </Button>
                <Button
                  variant={"secondary"}
                  type="button"
                  className="ml-2"
                  onClick={() => {
                    form.reset();
                    form.clearErrors();
                    removeWorkOrder();
                    setProject(undefined);
                    setRange(undefined);
                    setDisbleDates([]);
                  }}>
                  Clear
                  <IoMdCloseCircle className="ml-2 text-black" size={20} />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {workOrder && (
        <Alert
          variant={"default"}
          className="w-auto h-[50px] ml-0 border-l-[5px]  border-blue-400">
          <FcInfo className="text-theme" />
          <AlertDescription className="font-semibold text-blue-400">
            Update the details of the
            <span className="ml-2 font-bold text-black">
              {JSON.stringify(workOrder.name)}
            </span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WorkOrderFormContainer;
