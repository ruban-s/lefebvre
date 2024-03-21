"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IndirectCodeSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FaCogs } from "react-icons/fa";

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
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIndirectCode, updateIndirectCode } from "@/data/indirect-code";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useIndirectCodeStore } from "@/state";
import { Button } from "@/components/ui/button";

const IndirectCodeFormContainer = () => {
  const indirectCode = useIndirectCodeStore((state: any) => state.indirectCode); // Accessing the user object
  const removeIndirectCode = useIndirectCodeStore(
    (state: any) => state.removeIndirect
  );
  const queryClient = useQueryClient();

  const creatUser = useMutation({
    mutationFn: async (value: any) => {
      const breake = indirectCode
        ? await updateIndirectCode({ id: indirectCode?.id, ...value })
        : await createIndirectCode(value);
      removeIndirectCode();
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
      queryClient.invalidateQueries({ queryKey: ["indirects"] });
    },
    onError: (value) => {
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const form = useForm<z.infer<typeof IndirectCodeSchema>>({
    resolver: zodResolver(IndirectCodeSchema),
    defaultValues: {
      name: "",
      status: "",
      description: "",
      indirectCode: "",
    },
  });
  useEffect(() => {
    if (indirectCode) {
      form.setValue("name", indirectCode?.name!);
      form.setValue("status", indirectCode?.status!);
      form.setValue("description", indirectCode?.description!);
      form.setValue("indirectCode", indirectCode?.indirectCode!);
    }
  }, [indirectCode]);

  const onSubmit = async (values: z.infer<typeof IndirectCodeSchema>) => {
    creatUser.mutate(values);
  };

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      <div className=" ">
        <p className="text-lg font-semibold pl-4 pt-4">
          {indirectCode ? "Update Indirect Code" : "Add Indirect Code"}
        </p>
      </div>
      <div className="w-[100%] ml-auto mr-auto    p-4 ">
        <div className="w-full  flex flex-row mr-auto">
          <Form {...form}>
            <form className=" w-full " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:lg:grid-cols-4 2x gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>GL-Code</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="GL-Code" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="indirectCode"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Indirect Code ID</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Indirect Code ID"
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>description</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            height={20}
                            {...field}
                            multiple
                            placeholder="Description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="w-full py-4  flex justify-start items-center">
                <Button type="submit" className="bg-theme">
                  {indirectCode ? "Update Indirect Code" : "Add Indirect Code"}
                  <FaCogs className="ml-2 text-white" size={16} />
                </Button>
                {!indirectCode && (
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

                {indirectCode && (
                  <Alert
                    variant={"default"}
                    className="w-auto h-[50px] ml-8 border-l-[5px]  border-blue-400">
                    <FcInfo className="text-theme" />
                    <AlertDescription className="font-semibold text-blue-400">
                      Update the details of the
                      <span className="ml-2 font-bold text-black">
                        {JSON.stringify(indirectCode.name)}
                      </span>
                    </AlertDescription>
                  </Alert>
                )}
                {indirectCode && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      // setEdit(false);
                      removeIndirectCode();
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
    </div>
  );
};

export default IndirectCodeFormContainer;
