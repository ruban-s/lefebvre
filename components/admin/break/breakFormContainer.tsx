"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BreakSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { GiCoffeeCup } from "react-icons/gi";
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
import { createBreak, updateBreak } from "@/data/break";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { BreaksData } from "@/types";

const BreakFormContainer = ({ data }: { data: BreaksData | undefined }) => {
  const queryClient = useQueryClient();
  const [isEditable, setEdit] = useState<boolean>(false);
  const inputContainerDiv = classNames("flex-1");

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
    },
  });
  useEffect(() => {
    form.setValue("name", data?.name!);
    form.setValue("status", data?.status!);
    form.setValue("start_time", data?.start_time!);
    form.setValue("end_time", data?.end_time!);
    if (data) {
      setEdit(true);
    }
  }, [data]);

  const onSubmit = async (values: z.infer<typeof BreakSchema>) => {
    creatBreak.mutate(values);

    form.reset();
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center">
      <CommanCardContainer
        headerLabel={isEditable ? "Update Break" : "Add Break"}
        footer={false}>
        <div className="w-full flex flex-row">
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
                      <FormItem>
                        <FormLabel>Start time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            {...field}
                            placeholder="Start Time"
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
                          <Input
                            type="time"
                            {...field}
                            placeholder="End Time"
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
                  <Alert
                    variant={"default"}
                    className="w-auto h-[50px] ml-8 border-l-[5px]  border-blue-400">
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
      </CommanCardContainer>
    </div>
  );
};

export default BreakFormContainer;
