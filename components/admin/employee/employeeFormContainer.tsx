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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee, updateEmployee } from "@/data/employee";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useEmployeeStore } from "@/state";
import { ComboboxPopover } from "../../common/combo-box";
import Image from "next/image";
import { EmployeeData } from "@/types";
import CustomImageInput from "@/components/common/customImageInput";

const EmployeeFormContainer = () => {
  const employee: EmployeeData = useEmployeeStore(
    (state: any) => state.employee
  ); // Accessing the employee object
  const removeEmployee = useEmployeeStore((state: any) => state.removeEmployee);
  const queryClient = useQueryClient();
  const [image, setImage] = useState<any>();
  const imageRef = useRef<HTMLInputElement>(null);

  const creatUser = useMutation({
    mutationFn: async (value: any) => {
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
      // console.log(employee);
      form.setValue("designation_id", employee?.designation_id!);
      form.setValue("email", employee?.email!);
      form.setValue("mobile", employee?.mobile!);
      form.setValue("first_name", employee?.first_name!);
      form.setValue("last_name", employee?.last_name!);
      form.setValue("gender", employee?.gender!);
      form.setValue("status", employee?.status!);
      form.setValue("employee_id", employee?.employee_id!);
      form.setValue("image_path", employee?.image_path);
      // setEdit(true);
    }
  }, [employee]);

  const onSubmit = async (values: z.infer<typeof EmployeeSchema>) => {
    creatUser.mutate(values);
  };
  useEffect(() => {
    // console.log(image);
    form.setValue("image_path", image);
  }, [image]);

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      <div className=" ">
        <p className="text-lg font-semibold pl-4 pt-4">
          {employee ? "Update Employee" : "Add Employee"}
        </p>
      </div>
      <div className="w-[100%] ml-auto mr-auto  flex justify-center items-center   p-4 ">
        <div className="w-[100%]  flex flex-row mr-auto ">
          <CustomImageInput
            value={form.watch("image_path")!}
            onChange={(value: string) => {
              form.setValue("image_path", value);
            }}
          />
          {/* <div className=" w-[150px] h-[150px] bg-[url('/cog-bg2.png')] bg-im flex justify-center items-center mr-2 rounded-md relative">
            <Input
              ref={imageRef}
              type="file"
              className="absolute"
              onChange={async (value: any) => {
                const file = value.target?.files[0];
                const base64String = await fileToBase64(file);
                setImage(base64String);
              }}
            />
            <Image
              alt="emp-img"
              src={
                form.watch("image_path")
                  ? form.watch("image_path")
                  : image
                  ? image
                  : "https://github.com/shadcn.png"
              }
              fill
              className="object-cover rounded-sm group bg-neutral-200"
            />
            <Button
              className="absolute right-0 bottom-0 m-1  flex"
              variant={"secondary"}
              onClick={() => {
                imageRef.current?.click();
              }}>
              <CiImageOn />
            </Button>
          </div> */}
          <Form {...form}>
            <form className=" flex-1 " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4 2xl:lg:grid-cols-4 gap-2">
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
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
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
                      // setEdit(false);
                    }}>
                    Clear
                    <IoMdCloseCircle className="ml-2 text-black" size={20} />
                  </Button>
                )}

                {employee && (
                  <Alert
                    variant={"default"}
                    className="w-auto h-[50px] ml-8 border-l-[5px]  border-blue-400">
                    <FcInfo className="text-theme" />
                    <AlertDescription className="font-semibold text-blue-400">
                      Update the details of the
                      <span className="ml-2 font-bold text-black">
                        {employee.employee_id}
                      </span>
                    </AlertDescription>
                  </Alert>
                )}
                {employee && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
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
    </div>
  );
};

export default EmployeeFormContainer;
