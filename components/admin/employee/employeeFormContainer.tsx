"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FaUsersCog } from "react-icons/fa";

import { IoMdCloseCircle } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
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
import CommanCardContainer from "../../common/common-cart";
import { Button } from "../../ui/button";
import { useEffect, useState, useRef } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createEmployee, updateEmployee } from "@/data/employee";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useEmployeeStore } from "@/state";
import { ComboboxPopover } from "../../common/combo-box";
import Image from "next/image";
import { EmployeeData, ShiftData } from "@/types";
import CustomImageInput from "@/components/common/customImageInput";
import { getAllShift } from "@/data/shift";

const EmployeeFormContainer = () => {
  const employee: EmployeeData = useEmployeeStore(
    (state: any) => state.employee
  ); // Accessing the employee object
  const removeEmployee = useEmployeeStore((state: any) => state.removeEmployee);
  const queryClient = useQueryClient();
  const [image, setImage] = useState<any>();
  const imageRef = useRef<HTMLInputElement>(null);
  const {
    data: shift,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shift"],
    queryFn: async () => {
      const data = await getAllShift();
      return JSON.parse(data.data) as ShiftData[];
    },
  });
  const creatUser = useMutation({
    mutationFn: async (value: any) => {
      console.log({ id: employee?.id, ...value });
      const breake = employee
        ? await updateEmployee({ id: employee?.id, ...value })
        : await createEmployee(value);
      removeEmployee();
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
      } else {
        toast.error(`Something went wrong`, {
          description: "Data not updated contact the admin",
          position: "top-right",
          dismissible: true,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
    onError: (value) => {
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const form = useForm<z.infer<typeof EmployeeSchema>>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      designation_id: "",
      email: "",
      employee_id: "",
      mobile: "",
      status: "",
      gender: "",
      image_path: "",
      // current_shift_id: "",
      // current_shift_name: "",
      // previous_shift_id: "",
      // previous_shift_name: "",
    },
  });
  function fileToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader?.result;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }
  useEffect(() => {
    if (employee) {
      form.setValue("designation_id", employee?.designation_id!);
      form.setValue("email", employee?.email!);
      form.setValue("mobile", employee?.mobile!);
      form.setValue("first_name", employee?.first_name!);
      form.setValue("last_name", employee?.last_name!);
      form.setValue("gender", employee?.gender!);
      form.setValue("status", employee?.status!);
      form.setValue("employee_id", employee?.employee_id!);
      form.setValue("image_path", employee?.image_path);
      form.setValue("current_shift_id", "");
      form.setValue("current_shift_name", "");
      form.setValue("previous_shift_id", employee?.previous_shift_id || "");
      form.setValue("previous_shift_name", employee?.previous_shift_name || "");
      // setEdit(true);
    }
  }, [employee]);

  const onSubmit = async (values: z.infer<typeof EmployeeSchema>) => {
    creatUser.mutate(values);
  };
  useEffect(() => {
    if (image) {
      return form.setValue("image_path", image);
    }
    form.setValue("image_path", "");
  }, [image]);

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      <div className=" ">
        <p className="text-lg font-semibold pl-4 pt-4">
          {employee ? "Update Employee" : "Add Employee"}
        </p>
      </div>
      <div className="w-[100%] ml-auto mr-auto  flex justify-center items-center   p-4 ">
        <div className="w-[100%]  flex flex-col justify-center items-center lg:justify-start lg:items-start  lg:flex-row mr-auto ">
          <CustomImageInput
            value={form.watch("image_path")!}
            onChange={(value: string) => {
              form.setValue("image_path", value);
            }}
          />

          <Form {...form}>
            <form className=" w-full " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="First name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Last name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="employee_id"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Employee ID</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Employee ID"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className=" w-[100%] flex  flex-row justify-start items-end">
                  <div className="w-[80%]">
                    <FormField
                      control={form.control}
                      name="designation_id"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Designation</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                placeholder="Designation"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <ComboboxPopover
                    select={(value: string) =>
                      form.setValue("designation_id", value)
                    }
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} placeholder="Email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Mobile.no</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
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
                  name="gender"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          value={form.watch("gender")}
                          onValueChange={(value) => {
                            form.setValue("gender", value);
                          }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="previous_shift_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Shift Name</FormLabel>
                        <Select
                          value={form.watch("previous_shift_name")}
                          onValueChange={(value) => {
                            var selectedShift = shift?.filter(
                              (info) => info.shift_name === value
                            );
                            if (selectedShift && selectedShift?.length < 1)
                              return;
                            form.setValue("previous_shift_name", value);
                            form.setValue(
                              "previous_shift_id",
                              `${selectedShift![0].id}`
                            );
                          }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Shift" />
                          </SelectTrigger>
                          <SelectContent>
                            {shift?.map((info, index) => {
                              return (
                                <SelectItem key={index} value={info.shift_name}>
                                  {info.shift_name}
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
                          value={form.watch("status")}
                          onValueChange={(value) => {
                            form.setValue("status", value);
                          }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
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
                  {employee ? "Update employee" : "Add employee"}
                  <FaUsersCog className="ml-2 text-white" size={16} />
                </Button>
                {!employee && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      form.setValue("current_shift_name", "");

                      // setEdit(false);
                    }}>
                    Clear
                    <IoMdCloseCircle className="ml-2 text-black" size={20} />
                  </Button>
                )}

                {employee && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      form.setValue("current_shift_name", "");
                      // setEdit(false);
                      removeEmployee();
                    }}>
                    {"Clear"}
                    <IoMdCloseCircle className="ml-2 text-black" size={20} />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>

        {/* </CommanCardContainer> */}
      </div>
      {employee && (
        <Alert
          variant={"default"}
          className="w-auto h-[50px]  border-l-[5px]  border-blue-400">
          <FcInfo className="text-theme" />
          <AlertDescription className="font-semibold text-blue-400">
            Update the details of the
            <span className="ml-2 font-bold text-black">
              {employee.employee_id}
            </span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EmployeeFormContainer;
