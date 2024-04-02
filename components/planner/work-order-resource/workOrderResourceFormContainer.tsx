/* trunk-ignore-all(prettier) */
"use client";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResourceWorkOrderListSchema,
  ResourceWorkOrderSchema,
} from "@/schemas/index";
import { Input } from "@/components/ui/input";
import { FaUser } from "react-icons/fa";

import { IoMdCloseCircle } from "react-icons/io";
import { FcInfo } from "react-icons/fc";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import { toast } from "sonner";
import { Button } from "../../ui/button";
import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createResourceWorkOrder,
  getAllResourceWorkOrder,
  updateResourceWorkOrder,
} from "@/data/resource-work-order";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useResourceWorkOrderStore } from "@/state";
import { useRouter } from "next/navigation";
import { DatePickerWithRange } from "@/components/common/dateRangePicker";
import { DateRange } from "react-day-picker";
import { format, differenceInDays, addDays } from "date-fns";
import ProjectListCombo from "../../common/projectListCombo";
import { ProjectData, ResourceData, WorkOrderData } from "@/types";
import WorkOrderListCombo from "@/components/common/workOrderListCombo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllResources } from "@/data/resources";
const WorkOrderResourceFormContainer = () => {
  const workOrder = useResourceWorkOrderStore(
    (state: any) => state.resourceWorkOrder
  ); // Accessing the workOrder object
  const removeResourceWorkOrder = useResourceWorkOrderStore(
    (state: any) => state.removeResourceWorkOrder
  );
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedProject, setProject] = useState<ProjectData | undefined>();
  const [selectedWorkOrder, setWorkOrder] = useState<
    WorkOrderData | undefined
  >();
  const dialogRef = useRef<HTMLButtonElement>(null);
  const [workOderList, setWorkOrderList] = useState<WorkOrderData[]>([]);
  const {
    data: resource,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["resource"],
    queryFn: async () => {
      const data = await getAllResources();
      return JSON.parse(data.data) as ResourceData[];
    },
  });

  const creatWorkOrder = useMutation({
    mutationFn: async (value: any) => {
      const breake = workOrder
        ? await updateResourceWorkOrder({ id: workOrder?.id, ...value })
        : await createResourceWorkOrder(value);
      removeResourceWorkOrder();
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
        setWorkOrder(undefined);
        fields.map((info, index) => remove(index));
      } else {
        toast.error(`Something went wrong`, {
          description: `${value.message}`,
          position: "top-right",
          dismissible: true,
        });
      }
      queryClient.invalidateQueries({
        queryKey: [
          "resource-work-orders",
          "unreleased-resource-work-orders",
          "released-resource-work-orders",
          "closed-resource-work-orders",
        ],
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
  const degaultValusSet = {
    project_id: "",
    work_order_id: "",
  };
  const form = useForm<z.infer<typeof ResourceWorkOrderListSchema>>({
    resolver: zodResolver(ResourceWorkOrderListSchema),
    defaultValues: degaultValusSet,
  });
  const { fields, append, remove } = useFieldArray<
    z.infer<typeof ResourceWorkOrderListSchema>
  >({
    control: form.control,
    name: "resources",
  });
  useEffect(() => {
    if (workOrder) {
      setProject(workOrder.project_id);
      setWorkOrder(workOrder.work_order_id);
      append({
        actual_hour: workOrder.actual_hour,
        bench_mark_measure: workOrder.bench_mark_measure,
        prepared_quantity: workOrder.prepared_quantity,
        remark: workOrder.remark,
        sqNumber: workOrder.sqNumber,
        project_id: workOrder.project_id,
        resourceId: workOrder.resourceId,
        status: workOrder.status,
        work_order_id: workOrder.work_order_id,
      });
      // setEdit(true);
    }
  }, workOrder);

  const onSubmit = async (
    values: z.infer<typeof ResourceWorkOrderListSchema>
  ) => {
    console.log(values);
    creatWorkOrder.mutate(values.resources);
    dialogRef.current?.click();
  };

  const chooseProject = (value: ProjectData) => {
    if (!value) {
      form.setValue("project_id", "");
      setProject(value);
      setWorkOrder(undefined);
      return;
    }

    form.setValue("project_id", value.project_id);
    setProject(value);
    setWorkOrder(undefined);
  };
  const chooseWorkOrder = (value: WorkOrderData) => {
    if (!value) {
      setWorkOrder(undefined);
      return;
    }
    form.setValue("work_order_id", value.work_order_id);
    setWorkOrder(value);
  };
  const checkValue = (value: any) => {
    var newData = fields.filter((info) => info.resourceId === value);
    return newData.length > 0 ? true : false;
  };

  return (
    <div className="w-full h-auto bg-white  shadow-sm ring-1 ring-theme rounded-sm">
      <div className="bg-theme w-full pl-2 py-2 ">
        <p className="text-lg font-bold text-white ">
          {workOrder
            ? "Update Resource Work Order"
            : "Add Resource Work Order "}
        </p>
      </div>
      <div className="w-[100%] ml-auto mr-auto  flex justify-center items-center   p-4 ">
        <div className="w-[100%]  flex flex-col justify-center items-center lg:justify-start lg:items-start  lg:flex-row mr-auto ">
          <Form {...form}>
            <form className=" w-full " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                <FormField
                  control={form.control}
                  name="project_id"
                  render={({ field }) => {
                    return (
                      <FormItem>
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
                        <FormLabel>Work Order ID</FormLabel>
                        <FormControl>
                          <WorkOrderListCombo
                            work_order_id={selectedWorkOrder?.work_order_id}
                            value={selectedWorkOrder}
                            onChange={chooseWorkOrder}
                            project_id={selectedProject?.project_id}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="resources"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full flex flex-col mt-3">
                        <FormLabel>Resource Id</FormLabel>
                        <FormControl>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <div className="w-full">
                                <Button
                                  variant="outline"
                                  className="w-auto flex justify-start items-start border-dashed border-2 ">
                                  +
                                  {fields.length > 3 && (
                                    <Badge className="ml-2 rounded-sm bg-neutral-500">
                                      {fields.length} selected
                                    </Badge>
                                  )}
                                  {fields.length < 4 &&
                                    fields.map((info, index) => {
                                      return (
                                        <Badge
                                          key={index}
                                          className="ml-2 rounded-sm bg-neutral-500">
                                          {info.resourceId}
                                        </Badge>
                                      );
                                    })}
                                </Button>
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 p-4">
                              {resource?.map((info, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="w-full p-1 flex justify-between items-center">
                                    <p>{info.resource_id}</p>
                                    <Checkbox
                                      checked={checkValue(info.resource_id)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          append({
                                            actual_hour: "",

                                            bench_mark_measure: "",

                                            project_id: `${selectedProject?.project_id}`,

                                            prepared_quantity: "",

                                            remark: "",

                                            resourceId: `${info.resource_id}`,
                                            sqNumber: "",

                                            work_order_id: `${selectedWorkOrder?.work_order_id}`,
                                            status: "Unreleased",
                                          });
                                        } else {
                                          var index = fields.findIndex(
                                            (data) =>
                                              data.resourceId ===
                                              info.resource_id
                                          );
                                          console.log(index);
                                          remove(index);
                                        }
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <Dialog>
                <DialogTrigger className="mt-2" ref={dialogRef}>
                  {/* <Button type="button" className="disp">Next</Button> */}
                </DialogTrigger>
                <DialogContent className="w-3/4 min-h-[200px]  overflow-y-scroll flex flex-col items-center justify-start p-2">
                  <DialogHeader className="flex w-full justify-start items-start">
                    <DialogTitle className="font-extrabold capitalize text-md text-theme">
                      Resource IDs Details
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="w-full h-[500px]  lg:h-[700px] bg-slate-100 rounded-md p-1">
                    {fields.map((info: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="w-full  h-auto p-2 bg-white mb-2 border-l-2 border-l-black shadow-lg  rounded-md">
                          <Badge variant="default" className="rounded-sm">
                            {info.resourceId}
                          </Badge>

                          <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-2">
                            <FormField
                              key={info.resourceId}
                              control={form.control}
                              name={`resources.${index}.sqNumber`}
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel className="text-sm">
                                      Sequence Number
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="uppercase placeholder:capitalize  "
                                        type="text"
                                        {...field}
                                        placeholder="Sequence Number"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                            <FormField
                              key={info.resourceId}
                              control={form.control}
                              name={`resources.${index}.actual_hour`}
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel className="text-sm">
                                      Actual Hour
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="uppercase placeholder:capitalize  "
                                        type="text"
                                        {...field}
                                        placeholder="Actual Hour"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                            <FormField
                              key={info.resourceId}
                              control={form.control}
                              name={`resources.${index}.prepared_quantity`}
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel className="text-sm">
                                      Quantity
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="uppercase placeholder:capitalize  "
                                        type="text"
                                        {...field}
                                        placeholder="Quantity Unit"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                            <FormField
                              key={info.resourceId}
                              control={form.control}
                              name={`resources.${index}.bench_mark_measure`}
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel className="text-sm">
                                      Bench Mark Measure
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="uppercase placeholder:capitalize  "
                                        type="text"
                                        {...field}
                                        placeholder="Bench Mark Measure"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                            <FormField
                              key={info.resourceId}
                              control={form.control}
                              name={`resources.${index}.remark`}
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel className="text-sm">
                                      Remark
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="uppercase placeholder:capitalize  "
                                        type="text"
                                        {...field}
                                        placeholder="Remark"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                            <FormField
                              control={form.control}
                              name={`resources.${index}.status`}
                              render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                      disabled
                                      value={form.watch(
                                        `resources.${index}.status`
                                      )}
                                      onValueChange={(value) => {
                                        form.clearErrors(
                                          `resources.${index}.status`
                                        );
                                        form.setValue(
                                          `resources.${index}.status`,
                                          value
                                        );
                                      }}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Unreleased">
                                          Unreleased
                                        </SelectItem>
                                        <SelectItem value="Released">
                                          Released
                                        </SelectItem>
                                        <SelectItem value="Closed">
                                          Closed
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </ScrollArea>
                  <div className="w-full py-4  flex justify-start items-center">
                    <Button
                      type="submit"
                      className="bg-theme"
                      onClick={form.handleSubmit(onSubmit)}>
                      {workOrder
                        ? "Update Resource Work Order"
                        : "Add Resource Work Order"}
                      <FaUser className="ml-2 text-white" size={16} />
                    </Button>
                    <Button
                      variant={"secondary"}
                      type="button"
                      className="ml-2"
                      onClick={() => {
                        dialogRef.current?.click();
                        // form.reset();
                        // form.clearErrors();
                        // fields.map((info, index) => {
                        //   return remove(index);
                        // });
                        // setProject(undefined);
                        // setWorkOrder(undefined);
                      }}>
                      Clear
                      <IoMdCloseCircle className="ml-2 text-black" size={20} />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="w-full py-4  flex justify-start items-center">
                <Button
                  type="button"
                  className="bg-theme"
                  onClick={() => {
                    if (
                      form.watch("project_id")?.trim() === "" ||
                      form.watch("work_order_id")?.trim() === "" ||
                      fields.length < 1
                    ) {
                      if (form.watch("project_id")?.trim() === "") {
                        form.setError("project_id", {
                          message: "Project Id is required!",
                        });
                      }
                      if (form.watch("work_order_id")?.trim() === "") {
                        form.setError("work_order_id", {
                          message: "Work Order Id is required!",
                        });
                      }
                      if (fields.length < 1) {
                        form.setError("resources", {
                          message: "Minimum One Resource Id Needed!",
                        });
                      }
                      return;
                    }
                    form.clearErrors();
                    dialogRef.current?.click();
                  }}>
                  {workOrder
                    ? "Update Resource Work Order"
                    : "Add Resource Work Order"}
                  <FaUser className="ml-2 text-white" size={16} />
                </Button>
                <Button
                  variant={"secondary"}
                  type="button"
                  className="ml-2"
                  onClick={() => {
                    form.reset();
                    form.clearErrors();
                    fields.map((info, index) => {
                      return remove(index);
                    });
                    removeResourceWorkOrder();
                    setProject(undefined);
                    setWorkOrder(undefined);
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

export default WorkOrderResourceFormContainer;
