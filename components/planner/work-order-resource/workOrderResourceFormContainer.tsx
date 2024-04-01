/* trunk-ignore-all(prettier) */
"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceWorkOrderListSchema } from "@/schemas/index";
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
import WorkOrderListCombo from "@/components/common/workOrderListCombo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const WorkOrderResourceFormContainer = () => {
  const workOrder = useWorkOrderStore((state: any) => state.workOrder); // Accessing the workOrder object
  const removeWorkOrder = useWorkOrderStore(
    (state: any) => state.removeWorkOrder
  );
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedProject, setProject] = useState<ProjectData | undefined>();
  const [selectedWorkOrder, setWorkOrder] = useState<
    WorkOrderData | undefined
  >();
  const [workOderList, setWorkOrderList] = useState<WorkOrderData[]>([]);

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
      } else {
        toast.error(`Something went wrong`, {
          description: `${value.message}`,
          position: "top-right",
          dismissible: true,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
    },
    onError: (value) => {
      toast.error(`Something went wrong`, {
        description: `${value.message}`,
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const form = useForm<z.infer<typeof ResourceWorkOrderListSchema>>({
    resolver: zodResolver(ResourceWorkOrderListSchema),
    defaultValues: {
      project_id: "",
      work_order_id: "",
    },
  });
  useEffect(() => {
    if (workOrder) {
      //
      // setEdit(true);
    }
  }, [workOrder]);

  const onSubmit = async (
    values: z.infer<typeof ResourceWorkOrderListSchema>
  ) => {
    console.log(values);
    // creatWorkOrder.mutate(values);
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
                              <Button variant="outline" className="w-2/4 px-4">
                                Choose Resources
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                              {["one", "two"].map((info, index) => {
                                return (
                                  <div className="w-full p-1 flex justify-between items-center">
                                    <p>{info}</p>
                                    <Checkbox
                                      // checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        console.log(checked);
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
