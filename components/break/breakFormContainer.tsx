"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BreakSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
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
import CommanCardContainer from "../common/common-cart";
import { Button } from "../ui/button";

const BreakFormContainer = () => {
  const inputContainerDiv = classNames("flex-1");
  const form = useForm<z.infer<typeof BreakSchema>>({
    resolver: zodResolver(BreakSchema),
    defaultValues: {
      name: "",
      status: "",
      start_time: "",
      end_time: "",
    },
  });
  const setStatus = form.watch("status");
  const onSubmit = async (values: z.infer<typeof BreakSchema>) => {
    const validatedFields = BreakSchema.safeParse(values);
    console.log(values.name, values.start_time, values.end_time, values.status);
    form.reset();
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center">
      <CommanCardContainer headerLabel="Add Break :" footer={false}>
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
                            className="text-theme"
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
                          <Input type="time" {...field} />
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
                  Add Break
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CommanCardContainer>
    </div>
  );
};

export default BreakFormContainer;
