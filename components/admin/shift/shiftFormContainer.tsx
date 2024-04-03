"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShiftSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FaUser } from "react-icons/fa";

import { IoMdCloseCircle } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
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
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShift, updateShift } from "@/data/shift";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CustomImageInput from "@/components/common/customImageInput";

import { useShiftStore } from "@/state";
import { useRouter } from "next/navigation";
import CustomTimePicker from "@/components/common/customTimePicker";

const ShiftFormContainer = () => {
  const router = useRouter();
  const shift = useShiftStore((state: any) => state.shift); // Accessing the shift object
  const removeUser = useShiftStore((state: any) => state.removeShift);
  const queryClient = useQueryClient();

  const creatUser = useMutation({
    mutationFn: async (value: any) => {
      const breake = shift
        ? await updateShift({ id: shift?.id, ...value })
        : await createShift(value);
      removeUser();
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
      queryClient.invalidateQueries({ queryKey: ["shift"] });
    },
    onError: (value) => {
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const form = useForm<z.infer<typeof ShiftSchema>>({
    resolver: zodResolver(ShiftSchema),
    defaultValues: {
      shift_end_time: "",
      shift_name: "",
      shift_start_time: "",
      shift_type: "",
      status: "",
    },
  });
  useEffect(() => {
    if (shift) {
      form.setValue("shift_end_time", shift?.shift_end_time!);
      form.setValue("shift_name", shift?.shift_name!);
      form.setValue("shift_start_time", shift?.shift_start_time!);
      form.setValue("shift_type", shift?.shift_type!);
      form.setValue("status", shift?.status!);
    }
  }, [shift]);

  const onSubmit = async (values: z.infer<typeof ShiftSchema>) => {
    creatUser.mutate(values);
  };

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      <div className=" ">
        <p className="text-lg font-semibold pl-4 pt-4">
          {shift ? "Update Shift" : "Add Shift"}
        </p>
      </div>
      <div className="w-[100%] ml-auto mr-auto  flex justify-center items-center   p-4 ">
        <div className="w-[100%]  flex flex-col justify-center items-center lg:justify-start lg:items-start  lg:flex-row mr-auto ">
          <Form {...form}>
            <form className=" w-full " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-2">
                <FormField
                  control={form.control}
                  name="shift_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Shift Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Shift Name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="shift_type"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Shift Type</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Shift Type"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="shift_start_time"
                  render={({ field }) => {
                    return (
                      <FormItem className="m-0 p-0">
                        <FormLabel>Shift Start Time</FormLabel>
                        <FormControl className="m-0 p-0">
                          {/* <Input
                            type="time"
                            {...field}
                            placeholder="Start Time"
                          /> */}
                          <CustomTimePicker
                            value={form.watch("shift_start_time")}
                            onChange={(value: string) => {
                              form.setValue("shift_start_time", value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="shift_end_time"
                  render={({ field }) => {
                    return (
                      <FormItem className="m-0 p-0">
                        <FormLabel>Shift End Time</FormLabel>
                        <FormControl className="m-0 p-0">
                          {/* <Input
                            type="time"
                            {...field}
                            placeholder="Start Time"
                          /> */}
                          <CustomTimePicker
                            value={form.watch("shift_end_time")}
                            onChange={(value: string) => {
                              form.setValue("shift_end_time", value);
                            }}
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
                  {shift ? "Update Shift" : "Add Shift"}
                  <FaUser className="ml-2 text-white" size={16} />
                </Button>
                {!shift && (
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

                {shift && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      // setEdit(false);
                      removeUser();
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
      {shift && (
        <Alert
          variant={"default"}
          className="w-auto h-[50px] ml-0 border-l-[5px]  border-blue-400">
          <FcInfo className="text-theme" />
          <AlertDescription className="font-semibold text-blue-400">
            Update the details of the
            <span className="ml-2 font-bold text-black">
              {" "}
              {JSON.stringify(shift.name)}
            </span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ShiftFormContainer;
