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
import MultiFileSelect from "@/components/common/multiFileSelect";
import {
  getAllResourceWorkOrder,
  updateResourceWorkOrder,
} from "@/data/resource-work-order";
import { getAllLabourCard } from "@/data/labour-card";

const WorkOrderFormContainer = () => {
  const workOrder = useWorkOrderStore((state: any) => state.workOrder); // Accessing the workOrder object
  const removeWorkOrder = useWorkOrderStore(
    (state: any) => state.removeWorkOrder
  );
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedProject, setProject] = useState<ProjectData | undefined>();
  const [disabledDates, setDisbleDates] = useState<Date[]>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [file, selectedFile] = useState<string[]>([]);
  const [makeEmpty, setMakeEmpty] = useState<boolean>(false);
  const [disableTrue, setDisableTrue] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["work-orders"],
    queryFn: async () => {
      const data = await getAllWorkOrder();
      return JSON.parse(data.data) as WorkOrderData[];
    },
  });

  const checkDupliacteWorkOrder = async (value: any) => {
    const allWorkOrder = await getAllWorkOrder();
    const parsedWorkOrder = JSON.parse(allWorkOrder?.data);
    const filteredWorkOrder = parsedWorkOrder.filter((val: any) => {
      return (
        val.project_id === value.project_id &&
        val.work_order_id === value.work_order_id &&
        val.id !== workOrder?.id
      );
    });
    return filteredWorkOrder;
  };

  const creatWorkOrder = useMutation({
    mutationFn: async (value: any) => {
      let breake: any = [];
      if (workOrder) {
        const duplicateWorkOrder = await checkDupliacteWorkOrder(value);
        if (duplicateWorkOrder.length > 0)
          return new Error(`WorkOrderId is duplicated`);
      }
      if (
        workOrder &&
        (workOrder?.work_order_id !== value.work_order_id ||
          workOrder?.project_id !== value.project_id)
      ) {
        const Resources = await getAllResourceWorkOrder();
        const parsedResources = JSON.parse(Resources.data);
        for (const resource of parsedResources) {
          if (
            resource.project_id === workOrder.project_id &&
            resource.work_order_id === workOrder.work_order_id
          ) {
            const updatedResourceVal = {
              id: resource?.id,
              estimated_hour: resource.estimated_hour,
              bench_mark_measure: resource.bench_mark_measure,
              bench_mark_unit: resource.bench_mark_unit,
              quantity_unit: resource.quantity_unit,
              remark: resource.remark,
              required_quantity: resource.required_quantity,
              sqNumber: resource.sqNumber,
              status: resource.status,
              ballance_hour: resource.ballance_hour,
              ballanced_quantity: resource.ballanced_quantity,
              production_remark: resource.production_remark,
              employee_id: resource.employee_id,
              endDate: resource.endDate,
              actual_hour: resource.actual_hour,
              forman: resource.forman,
              attachment: resource.attachment,
              project_id: value.project_id,
              resourceId: resource.resourceId,
              prepared_quantity: resource.prepared_quantity,
              startDate: resource.startDate,
              work_order_id: value.work_order_id,
            };
            const updatedResourceWorkOrder = await updateResourceWorkOrder({
              ...updatedResourceVal,
              id: resource?.id,
            });
          }
        }
        breake = await updateWorkOrder({ id: workOrder?.id, ...value });
      } else if (workOrder) {
        breake = await updateWorkOrder({ id: workOrder?.id, ...value });
      } else {
        breake = await createWorkOrder(value);
      }
      // const breake = workOrder
      //   ? await updateWorkOrder({ id: workOrder?.id, ...value })
      //   : await createWorkOrder(value);

      setDateRange(undefined);
      setMakeEmpty(true);
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
        selectedFile([]);
        setDisableTrue(false);
      } else {
        toast.error(`Something went wrong`, {
          description: `${value.message}`,
          position: "top-right",
          dismissible: true,
        });
      }
      ["work-orders", "resource-work-orders"].map((info, index) => {
        queryClient.invalidateQueries({
          queryKey: [info],
        });
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
      production_remark: "",
      images: [],
      requiredQuantity: "",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLabourCard();
        const labourCards = JSON.parse(data.data);

        const filterLabourCards = labourCards.filter(
          (val: any) =>
            val.project_id === workOrder.project_id &&
            val.work_order_id === workOrder.work_order_id
        );

        if (filterLabourCards.length > 0) {
          setDisableTrue(true);
        }

        setProject(workOrder?.project_id);
        selectedFile(workOrder?.images!);
        form.setValue("project_id", workOrder?.project_id!);
        form.setValue("work_order_id", workOrder?.work_order_id!);
        form.setValue("planner_remark", workOrder?.planner_remark!);
        form.setValue("start_date", workOrder?.start_date!);
        form.setValue("end_date", workOrder?.end_date!);
        form.setValue("status", workOrder?.status!);
        form.setValue("images", workOrder?.images!);
        form.setValue("production_remark", workOrder?.production_remark!);
        form.setValue("description", workOrder?.description!);
        form.setValue("requiredQuantity", workOrder?.requiredQuantity!);
        var startDate = workOrder?.start_date!.toString().split("-");
        var endDate = workOrder?.end_date!.toString().split("-");

        setDateRange({
          from: new Date(`${startDate[1]}-${startDate[0]}-${startDate[2]}`),
          to: new Date(`${endDate[1]}-${endDate[0]}-${endDate[2]}`),
        });
      } catch (err) {
        toast.error(`Something went wrong`, {
          position: "top-right",
          dismissible: true,
        });
      }
    };
    if (workOrder) {
      toast.promise(fetchData(), {
        loading: "Loading...",
        success: "Project is ready for editing!",
        error: "Unable to Edit",
        position: "top-right",
        dismissible: true,
      });
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
    setProject(value);
    if (!value) {
      form.setValue("work_order_id", "");
      form.setValue("project_id", "");
      setProject(value);
      setDisbleDates([]);

      return;
    }
    if (!workOrder?.work_order_id) {
      form.setValue("work_order_id", value.project_id + "-");
    }
    form.setValue("project_id", value.project_id);
    setProject(value);
    var startDate = value?.start_date!.toString().split("-");
    var endDate = value?.end_date!.toString().split("-");
    form.setValue("start_date", value?.start_date!);
    form.setValue("end_date", value?.end_date!);
    if (!workOrder) {
      setFromDate(`${startDate[1]}-${startDate[0]}-${startDate[2]}`);
      setToDate(`${endDate[1]}-${endDate[0]}-${endDate[2]}`);
      setDateRange({
        from: new Date(`${startDate[1]}-${startDate[0]}-${startDate[2]}`),
        to: new Date(`${endDate[1]}-${endDate[0]}-${endDate[2]}`),
      });
      const projectWiseWorkOrders: WorkOrderData[] | undefined = data?.filter(
        (info) => info.project_id === value?.project_id
      );
    }

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

  const clearItem = () => {
    form.reset();
    form.clearErrors();
    removeWorkOrder();
    selectedFile([]);
    setProject(undefined);
    setRange(undefined);
    setDisableTrue(false);
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
                            disabled={disableTrue}
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
                            disabled={disableTrue}
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
                            disabled={disableTrue}
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
                  name="requiredQuantity"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Required Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Required Quantity"
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
                            fromDate={fromDate}
                            toDate={toDate}
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
                            <SelectItem value="Canceled" disabled>
                              Canceled
                            </SelectItem>
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
                          <div className="w-full h-auto">
                            <MultiFileSelect
                              files={file}
                              onChange={(e: any) => {
                                selectedFile(e);
                                form.setValue("images", [...e]);
                              }}
                            />
                            {/* {workOrder ? (
                              <h1>({workOrder.images.length}) files</h1>
                            ) : (
                              ""
                            )} */}
                          </div>
                          {/* <Input
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
                          /> */}
                        </FormControl>
                        <FormMessage />
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
                    clearItem();
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
