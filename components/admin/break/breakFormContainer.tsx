"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BreakSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { GiCoffeeCup } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { FcInfo } from "react-icons/fc";
import Datetime from "react-datetime";
import { FaRegClock } from "react-icons/fa";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import CommanCardContainer from "../../common/common-cart";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createBreak, updateBreak } from "@/data/break";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { BreaksData, ShiftData } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomTimePicker from "@/components/common/customTimePicker";
import { getAllShift } from "@/data/shift";

const BreakFormContainer = ({ data }: { data: BreaksData | undefined }) => {
  const queryClient = useQueryClient();
  const [isEditable, setEdit] = useState<boolean>(false);
  const inputContainerDiv = classNames("flex-1");
  const { data: shift } = useQuery({
    queryKey: ["shift"],
    queryFn: async () => {
      const data = await getAllShift();
      return JSON.parse(data.data) as ShiftData[];
    },
  });
  const creatBreak = useMutation({
    mutationFn: async (value: any) => {
      const breake = isEditable
        ? await updateBreak({ id: data?.id, ...value })
        : await createBreak(value);
      setEdit(false);
      return breake;
    },
    onSuccess: (value) => {
      if (value.status) {
        toast.success(`Break added successfully`, {
          description: `${value.message}`,
          position: "top-right",
          dismissible: true,
        });
      } else {
        toast.error(`Something went wrong`, {
          description: "Data not updated contact the admin",
          position: "top-right",
          dismissible: true,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["break"] });
    },
    onError: (value) => {
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const form = useForm<z.infer<typeof BreakSchema>>({
    resolver: zodResolver(BreakSchema),
    defaultValues: {
      name: "",
      status: "",
      start_time: "",
      end_time: "",
      shift_id: "",
      shift_name: "",
    },
  });
  useEffect(() => {
    form.setValue("name", data?.name!);
    form.setValue("status", data?.status!);
    form.setValue("start_time", data?.start_time!);
    form.setValue("end_time", data?.end_time!);
    form.setValue("shift_id", data?.shift_id!);
    form.setValue("shift_name", data?.shift_name!);

    if (data) {
      setEdit(true);
    }
  }, [data]);
  useEffect(() => {
    form.setValue("start_time", "");
    form.setValue("end_time", "");
  }, []);

  const onSubmit = async (values: z.infer<typeof BreakSchema>) => {
    creatBreak.mutate(values);
    form.reset();
  };

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      <div className=" ">
        <p className="text-lg font-semibold pl-4 pt-4">
          {isEditable ? "Update Break" : "Add Break"}
        </p>
      </div>
      <div className="w-[100%] ml-auto mr-auto    p-4 ">
        <div className="w-full  flex flex-row mr-auto">
          <Form {...form}>
            <form className=" w-full " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Break type lunch,dinner,breakfast "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="start_time"
                  render={({ field }) => {
                    return (
                      <FormItem className="m-0 p-0">
                        <FormLabel>Start time</FormLabel>
                        <FormControl className="m-0 p-0">
                          {/* <Input
                            type="time"
                            {...field}
                            placeholder="Start Time"
                          /> */}
                          <CustomTimePicker
                            value={form.watch("start_time")}
                            onChange={(value: string) => {
                              form.setValue("start_time", value);
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
                  name="end_time"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>End time</FormLabel>
                        <FormControl>
                          {/* <Input
                            type="time"
                            {...field}
                            placeholder="End Time"
                          /> */}
                          <CustomTimePicker
                            value={form.watch("end_time")}
                            onChange={(value: string) => {
                              form.setValue("end_time", value);
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
                  name="shift_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Shift Name</FormLabel>
                        <Select
                          value={form.watch("shift_name")}
                          onValueChange={(value) => {
                            var selectedShift = shift?.filter(
                              (info) => info.shift_name === value
                            );
                            if (!selectedShift || selectedShift!.length < 1)
                              return;
                            form.setValue("shift_name", value);
                            form.setValue(
                              "shift_id",
                              `${
                                (selectedShift![0].id &&
                                  selectedShift![0].id) ??
                                0
                              }`
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
                  {isEditable ? "Update Break" : "Add Break"}
                  <GiCoffeeCup className="ml-2 text-white" size={25} />
                </Button>
                {!isEditable && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      setEdit(false);
                    }}>
                    Clear
                    <IoMdCloseCircle className="ml-2 text-black" size={20} />
                  </Button>
                )}

                {isEditable && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      setEdit(false);
                    }}>
                    {"Clear"}
                    <IoMdCloseCircle className="ml-2 text-black" size={20} />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
        {isEditable && (
          <Alert
            variant={"default"}
            className="w-auto h-[50px] ml-0 border-l-[5px]  border-blue-400">
            <FcInfo className="text-theme" />
            <AlertDescription className="font-semibold text-blue-400">
              Update the details of the
              <span className="ml-2 font-bold text-black">
                {" "}
                {JSON.stringify(data?.name)}
              </span>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default BreakFormContainer;
