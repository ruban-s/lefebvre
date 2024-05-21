"use client";
import ProjectListCombo from "@/components/common/projectListCombo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormanReportSchema } from "@/schemas/reportindex";
import { ProjectData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { z } from "zod";

interface FormanIdProps {
  id: string;
  name: string;
}

interface FormanReportFormContainerProps {
  changeFilterData: Function;
  defaultData: {
    status: string;
    project_id: any;
    work_order_Id: any;
    forman_id: any;
  };
  workOrderList: string[];
  formanList: FormanIdProps[];
  fetchWorkOrder: Function;
}

const FormanReportFormContainer = ({
  changeFilterData,
  defaultData,
  workOrderList,
  fetchWorkOrder,
  formanList,
}: FormanReportFormContainerProps) => {
  const [selectedProject, setProject] = useState<ProjectData | undefined>();
  const [disable, setDisable] = useState<boolean>(true);
  const form = useForm<z.infer<typeof FormanReportSchema>>({
    resolver: zodResolver(FormanReportSchema),
    defaultValues: {
      status: "",
      project_id: "",
      work_order_Id: "",
      forman_id: "",
    },
  });

  const chooseProject = (value: ProjectData) => {
    if (!value) {
      form.setValue("project_id", "");
      form.setValue("work_order_Id", "");
      fetchWorkOrder();
      setProject(value);
      return;
    }
    form.setValue("project_id", value.project_id);
    form.setValue("work_order_Id", "");
    fetchWorkOrder(value.project_id);
    setProject(value);
  };

  useEffect(() => {
    if (
      defaultData.status &&
      defaultData.project_id &&
      defaultData.work_order_Id &&
      defaultData.forman_id
    ) {
      form.setValue("status", defaultData.status);
      form.setValue("work_order_Id", defaultData.work_order_Id);
      setProject(defaultData?.project_id);
      form.setValue("project_id", defaultData.project_id.project_id);
      form.setValue("forman_id", defaultData.forman_id);
      setDisable(false);
    }
  }, [defaultData]);

  const onSubmit = (value: z.infer<typeof FormanReportSchema>) => {
    changeFilterData(
      value.status,
      value.project_id,
      value.work_order_Id,
      value.forman_id
    );
  };

  return (
    <div className="w-full h-auto bg-white  shadow-sm ring-1 ring-theme rounded-sm">
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
                  name="work_order_Id"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>WorkOrderId</FormLabel>
                        <Select
                          disabled={disable}
                          value={form.watch("work_order_Id")}
                          onValueChange={(value) => {
                            form.clearErrors("work_order_Id");
                            form.setValue("work_order_Id", value);
                          }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select WorkOrder Id" />
                          </SelectTrigger>
                          <SelectContent>
                            {workOrderList.map((workOrder, index) => {
                              return (
                                <SelectItem key={index} value={workOrder}>
                                  {workOrder}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
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
                          disabled={disable}
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
                  name="forman_id"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>FormanId</FormLabel>
                        <Select
                          disabled={disable}
                          value={form.watch("forman_id")}
                          onValueChange={(value) => {
                            form.clearErrors("forman_id");
                            form.setValue("forman_id", value);
                          }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Forman Id" />
                          </SelectTrigger>
                          <SelectContent>
                            {formanList.map((forman, index) => {
                              return (
                                <SelectItem key={index} value={forman.id}>
                                  {`${forman.id} ${forman.name}`}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="w-full py-4  flex justify-start items-center">
                <Button type="submit" className="bg-theme" disabled={disable}>
                  Search
                  <CiSearch className="ml-2 text-white" size={16} />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FormanReportFormContainer;
