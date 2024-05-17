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
import { WorkOrderReportSchema } from "@/schemas/reportindex";
import { ProjectData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { z } from "zod";

interface WorkOrderReportFormContainerProps {
  changeFilterData: Function;
  defaultData: {
    status: string;
    project_id: any;
  };
}

const WorkOrderReportFormContainer = ({
  changeFilterData,
  defaultData,
}: WorkOrderReportFormContainerProps) => {
  const [selectedProject, setProject] = useState<ProjectData | undefined>();

  const form = useForm<z.infer<typeof WorkOrderReportSchema>>({
    resolver: zodResolver(WorkOrderReportSchema),
    defaultValues: {
      status: "",
      project_id: "",
    },
  });

  const chooseProject = (value: ProjectData) => {
    if (!value) {
      form.setValue("project_id", "");
      setProject(value);
      return;
    }
    form.setValue("project_id", value.project_id);
    setProject(value);
  };

  useEffect(() => {
    if (defaultData.status && defaultData.project_id) {
      form.setValue("status", defaultData.status);
      setProject(defaultData?.project_id);
    }
  }, [defaultData]);

  const onSubmit = (value: z.infer<typeof WorkOrderReportSchema>) => {
    changeFilterData(value.status, value.project_id);
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
                  name="status"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
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
              </div>
              <div className="w-full py-4  flex justify-start items-center">
                <Button type="submit" className="bg-theme">
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

export default WorkOrderReportFormContainer;
