"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeasureSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { GiThermometerScale } from "react-icons/gi";
<<<<<<< HEAD
import { IoMdCloseCircle, IoMdInformationCircleOutline } from "react-icons/io";
import { FcInfo } from "react-icons/fc";
import classNames from "classnames";
=======

import { IoMdCloseCircle } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FcInfo } from "react-icons/fc";

import classNames from "classnames";

>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
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
<<<<<<< HEAD
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMeasure, updateMeasure } from "@/data/measure";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMeasureStore } from "@/state";

const MeasureFormContainer = () => {
  const measure = useMeasureStore((state: any) => state.measure);
  const removeMeasure = useMeasureStore((state: any) => state.removeMeasure);
  const queryClient = useQueryClient();

  const createMeasureMutation = useMutation({
    mutationFn: async (value: any) => {
      const result = measure
        ? await updateMeasure({ id: measure?.id, ...value })
        : await createMeasure(value);
      removeMeasure();
      return result;
    },
    onSuccess: (value) => {
      if (value.status) {
        toast.success(value.message, {
          description: value.message,
=======
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMeasure, updateMeasure } from "@/data/measure";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useMeasureStore } from "@/state";

const MeasureFormContainer = () => {
  const measure = useMeasureStore((state: any) => state.measure); // Accessing the measure object
  const removeMeaure = useMeasureStore((state: any) => state.removeMeasure);
  const queryClient = useQueryClient();

  const creatUser = useMutation({
    mutationFn: async (value: any) => {
      const breake = measure
        ? await updateMeasure({ id: measure?.id, ...value })
        : await createMeasure(value);
      removeMeaure();
      return breake;
    },
    onSuccess: (value) => {
      // console.log(value);
      if (value.status) {
        toast.success(`${value.message}`, {
          description: `${value.message}`,
>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
          position: "top-right",
          dismissible: true,
        });
        form.reset();
      } else {
<<<<<<< HEAD
        toast.error("Something went wrong", {
          description: "Data not updated. Please contact the admin.",
=======
        toast.error(`Something went wrong`, {
          description: "Data not updated contact the admin",
>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
          position: "top-right",
          dismissible: true,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["measure"] });
    },
<<<<<<< HEAD
    onError: () => {
      toast.error("Something went wrong", {
=======
    onError: (value) => {
      // console.log(value);
      toast.error(`Something went wrong`, {
>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
        position: "top-right",
        dismissible: true,
      });
    },
  });
<<<<<<< HEAD

=======
>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
  const form = useForm<z.infer<typeof MeasureSchema>>({
    resolver: zodResolver(MeasureSchema),
    defaultValues: {
      unit: "",
      status: "",
    },
  });
<<<<<<< HEAD

  useEffect(() => {
    if (measure) {
      form.setValue("unit", measure.unit);
      form.setValue("status", measure.status);
=======
  useEffect(() => {
    // console.log(measure);
    if (measure) {
      form.setValue("unit", measure?.unit!);
      form.setValue("status", measure?.status!);
>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
    }
  }, [measure]);

  const onSubmit = async (values: z.infer<typeof MeasureSchema>) => {
<<<<<<< HEAD
    createMeasureMutation.mutate(values);
  };

  const clearForm = () => {
    form.reset();
    form.clearErrors();
    removeMeasure();
  };

  return (
    <div className="w-full h-auto bg-white shadow-sm">
      <div>
=======
    // console.log(values);
    creatUser.mutate(values);
  };

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      <div className=" ">
>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
        <p className="text-lg font-semibold pl-4 pt-4">
          {measure ? "Update Measure" : "Add Measure"}
        </p>
      </div>
<<<<<<< HEAD
      <div className="w-[100%] ml-auto mr-auto p-4">
        <div className="w-full flex flex-row mr-auto">
          <Form {...form}>
            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Measure</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} placeholder="Measure" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
=======
      <div className="w-[100%] ml-auto mr-auto    p-4 ">
        <div className="w-full  flex flex-row mr-auto">
          <Form {...form}>
            <form className=" w-full " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-2">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Unit Measure</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="Measure" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
                />

                <FormField
                  control={form.control}
                  name="status"
<<<<<<< HEAD
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Measure Status</FormLabel>
                      <Select
                        value={form.watch("status")}
                        onValueChange={(value) => {
                          form.setValue("status", value);
                        }}
                      >
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
                  )}
                />
              </div>

              <div className="w-full py-4 flex justify-start items-center">
=======
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Measure Status</FormLabel>
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
>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
                <Button type="submit" className="bg-theme">
                  {measure ? "Update Measure" : "Add Measure"}
                  <GiThermometerScale className="ml-2 text-white" size={16} />
                </Button>
                {!measure && (
<<<<<<< HEAD
                  <Button variant="secondary" type="button" className="ml-2" onClick={clearForm}>
=======
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      // setEdit(false);
                    }}>
>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
                    Clear
                    <IoMdCloseCircle className="ml-2 text-black" size={20} />
                  </Button>
                )}

                {measure && (
<<<<<<< HEAD
                  <Button variant="secondary" type="button" className="ml-2" onClick={clearForm}>
                    Clear
=======
                  <Button
                    variant={"secondary"}
                    type="button"
                    className="ml-2"
                    onClick={() => {
                      form.reset();
                      form.clearErrors();
                      removeMeaure();
                    }}>
                    {"Clear"}
>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
                    <IoMdCloseCircle className="ml-2 text-black" size={20} />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
        {measure && (
          <Alert
<<<<<<< HEAD
            variant="default"
            className="w-auto h-[50px] ml-0 border-l-[5px] border-blue-400"
          >
            <FcInfo className="text-theme" />
            <AlertDescription className="font-semibold text-blue-400">
              Update the details of the{" "}
              <span className="ml-2 font-bold text-black">{JSON.stringify(measure.unit)}</span>
            </AlertDescription>
          </Alert>
        )}
=======
            variant={"default"}
            className="w-auto h-[50px] ml-0 border-l-[5px]  border-blue-400">
            <FcInfo className="text-theme" />
            <AlertDescription className="font-semibold text-blue-400">
              Update the details of the
              <span className="ml-2 font-bold text-black">
                {" "}
                {JSON.stringify(measure.unit)}
              </span>
            </AlertDescription>
          </Alert>
        )}
        {/* </CommanCardContainer> */}
>>>>>>> 68abb1e971834068bd8f70a2684fa15dcd6f5c2f
      </div>
    </div>
  );
};

export default MeasureFormContainer;
