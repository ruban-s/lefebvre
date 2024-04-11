/* trunk-ignore-all(prettier) */
"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema } from "@/schemas";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { useEffect, useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject, updateProject } from "@/data/projects";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useProjectStore } from "@/state";
import { useRouter } from "next/navigation";
import { DatePickerWithRange } from "@/components/common/dateRangePicker";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import CustomImageInput from "@/components/common/customImageInput";
import { uploadImage } from "@/data/common";

const ProjectFormContainer = () => {
  const project = useProjectStore((state: any) => state.project); // Accessing the project object
  const removeProject = useProjectStore((state: any) => state.removeProject);
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const creatProject = useMutation({
    mutationFn: async (value: any) => {
      const breake = project
        ? await updateProject({ id: project?.id, ...value })
        : await createProject(value);
      setDateRange(undefined);
      removeProject();
      return breake;
    },
    onSuccess: (value) => {
      console.log(value);
      if (value.status) {
        toast.success(`${value.message}`, {
          description: `${value.message}`,
          position: "top-right",
          dismissible: true,
        });

        form.reset();
      } else {
        toast.error(`Something went wrong`, {
          description: `${value.message}`,
          position: "top-right",
          dismissible: true,
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (value) => {
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      project_id: "",
      planner_remark: "",
      start_date: "",
      status: "Unreleased",
      customer_name: "",
      description: "",
      images: [],
    },
  });
  useEffect(() => {
    if (project) {
      form.setValue("project_id", project?.project_id!);
      form.setValue("planner_remark", project?.planner_remark!);
      form.setValue("start_date", project?.start_date!);
      form.setValue("end_date", project?.end_date!);
      form.setValue("status", project?.status!);
      form.setValue("customer_name", project?.customer_name!);
      form.setValue("description", project?.description!);
      form.setValue("images", project?.images!);
      setDateRange({
        from: new Date(project?.start_date!),
        to: new Date(project?.end_date!),
      });
    }
  }, [project]);

  const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
    console.log(values);
    const { project_id, ...data } = values;
    const payload = { project_id: `${project_id}`.toUpperCase(), ...data };
    console.log(payload);
    creatProject.mutate(payload);
  };
  const newData = async (value: FormData, name: string) => {
    var data = await uploadImage(value, name);
    form.setValue("images", [...form.watch("images")!, data.data]);
    console.log(data);
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
      form?.setValue("start_date", format(from, "LLL dd, y"));
      form?.setValue("end_date", format(from, "LLL dd, y"));
      return;
    }
    form.setValue("start_date", format(from, "LLL dd, y"));
    form.setValue("end_date", format(to, "LLL dd, y"));

    return;
  };

  return (
    <div className="w-full h-auto bg-white  shadow-sm ring-1 ring-theme rounded-sm">
      <div className="bg-theme w-full pl-2 py-2 ">
        <p className="text-lg font-bold text-white ">
          {project ? "Update Project" : "Add Project"}
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
                      <FormItem>
                        <FormLabel>Project ID</FormLabel>
                        <FormControl>
                          <Input
                            className="uppercase placeholder:capitalize  "
                            type="text"
                            {...field}
                            placeholder="Project ID"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="customer_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Customer Name"
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
                            ref={ref}
                            multiple={true}
                            type="file"
                            placeholder=""
                            onChange={(e: any) => {
                              const formData = new FormData();
                              if (!e.target?.files) return;
                              !project && form.setValue("images", []);
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
                        {project && (
                          <p>selected files - {form.watch("images")!.length}</p>
                        )}
                      </FormItem>
                    );
                  }}
                />

                {/* <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Mobile.no</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="Mobile.no"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
               
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="role_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          value={form.watch("role_name")}
                          onValueChange={(value) => {
                            form.setValue("role_name", value);
                          }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="SuperAdmin
                            ">
                              SUPER-ADMIN
                            </SelectItem>
                            <SelectItem value="Admin">ADMIN</SelectItem>
                            <SelectItem value="Planner">PLANNER</SelectItem>
                            <SelectItem value="Production">
                              PRODUCTION
                            </SelectItem>
                            <SelectItem value="Foreman">FOREMAN</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />*/}
              </div>

              <div className="w-full py-4  flex justify-start items-center">
                <Button type="submit" className="bg-theme">
                  {project ? "Update Project" : "Add Project"}
                  <FaUser className="ml-2 text-white" size={16} />
                </Button>
                {!project && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      setRange(undefined);
                      // setRefreshcalender(!refreshCalender);
                      // setEdit(false);
                    }}>
                    Clear
                    <IoMdCloseCircle className="ml-2 text-black" size={20} />
                  </Button>
                )}

                {project && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      removeProject();
                    }}>
                    {"Clear"}
                    <IoMdCloseCircle className="ml-2 text-black" size={20} />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
      {project && (
        <Alert
          variant={"default"}
          className="w-auto h-[50px] ml-0 border-l-[5px]  border-blue-400">
          <FcInfo className="text-theme" />
          <AlertDescription className="font-semibold text-blue-400">
            Update the details of the
            <span className="ml-2 font-bold text-black">
              {" "}
              {JSON.stringify(project.name)}
            </span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ProjectFormContainer;
