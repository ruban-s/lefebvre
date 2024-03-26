"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FaUserCog } from "react-icons/fa";

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
import { createResources, updateResources } from "@/data/resources";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useResourceStore } from "@/state";

const ResourceFormContainer = () => {
  const resource = useResourceStore((state: any) => state.resourceCode); // Accessing the user object
  const removeResource = useResourceStore((state: any) => state.removeResource);
  const queryClient = useQueryClient();

  const creatUser = useMutation({
    mutationFn: async (value: any) => {
      const breake = resource
        ? await updateResources({ id: resource?.id, ...value })
        : await createResources(value);
      removeResource();
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
      queryClient.invalidateQueries({ queryKey: ["resource"] });
    },
    onError: (value) => {
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const form = useForm<z.infer<typeof ResourceSchema>>({
    resolver: zodResolver(ResourceSchema),
    defaultValues: {
      resource_id: "",
      status: "",
      res_description: "",
      res_note: "",
    },
  });
  useEffect(() => {
    if (resource) {
      form.setValue("resource_id", resource?.resource_id!);
      form.setValue("res_description", resource?.res_description!);
      form.setValue("res_note", resource?.res_note!);
      form.setValue("status", resource?.status);
    }
  }, [resource]);

  const onSubmit = async (values: z.infer<typeof ResourceSchema>) => {
    // console.log(values);
    creatUser.mutate(values);
  };

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      <div className=" ">
        <p className="text-lg font-semibold pl-4 pt-4">
          {resource ? "Update Resource" : "Add Resource"}
        </p>
      </div>
      <div className="w-[100%] ml-auto mr-auto    p-4 ">
        <div className="w-full  flex flex-row mr-auto">
          <Form {...form}>
            <form className=" w-full " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4 2xl:lg:grid-cols-5 gap-2">
                <FormField
                  control={form.control}
                  name="resource_id"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Resource ID</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Resource ID"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="res_description"
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
                  name="res_note"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="Notes" />
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
                  {resource ? "Update Resource" : "Add Resource"}
                  <FaUserCog className="ml-2 text-white" size={16} />
                </Button>
                {!resource && (
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

                {resource && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      // setEdit(false);
                      removeResource();
                    }}>
                    {"Clear"}
                    <IoMdCloseCircle className="ml-2 text-black" size={20} />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
        {resource && (
          <Alert
            variant={"default"}
            className="w-auto h-[50px] ml-0 border-l-[5px]  border-blue-400">
            <FcInfo className="text-theme" />
            <AlertDescription className="font-semibold text-blue-400 ">
              Update the details of the
              <span className="ml-2 font-bold text-black">
                {" "}
                {JSON.stringify(resource.resource_id)}
              </span>
            </AlertDescription>
          </Alert>
        )}
        {/* </CommanCardContainer> */}
      </div>
    </div>
  );
};

export default ResourceFormContainer;
