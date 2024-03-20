"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/schemas";
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
import { createUser, updateUser } from "@/data/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useStore } from "@/state";

const UserFormContainer = () => {
  const user = useStore((state: any) => state.user); // Accessing the user object
  const removeUser = useStore((state: any) => state.removeUser);
  const queryClient = useQueryClient();

  const creatUser = useMutation({
    mutationFn: async (value: any) => {
      const breake = user
        ? await updateUser({ id: user?.id, ...value })
        : await createUser(value);
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
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (value) => {
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",

      email: "",
      image: "",
      mobile: "",
      password: "",
      role_name: "",
      status: "",
      username: "",
    },
  });
  useEffect(() => {
    if (user) {
      // Object.keys(user).map((info:"image"|, index) => {
      //   form.setValue(`${info}`, user[`${info}`]);
      // });
      form.setValue("name", user?.name!);
      form.setValue("email", user?.email!);
      form.setValue("mobile", user?.mobile!);
      form.setValue("image", "");
      form.setValue("password", user?.password!);
      form.setValue("role_name", user?.role_name!);
      form.setValue("status", user?.status!);
      form.setValue("username", user?.username!);

      // setEdit(true);
    }
  }, [user]);

  const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    creatUser.mutate(values);
  };

  return (
    <div className="w-auto h-auto bg-white  m-2 mt-4 shadow-md rounded-sm">
      <div className=" w-full h-auto ">
        <p className="text-lg font-semibold pl-4 pt-4">
          {user ? "Update User" : "Add User"}
        </p>
      </div>
      <div className="w-[100%] max-h-[400px] ml-auto mr-auto    p-4 flex flex-col items-center justify-center overflow-auto ">
        {/* <CommanCardContainer
        headerLabel={user ? "Update User" : "Add User"}
        footer={false}> */}

        <div className="w-full flex flex-row">
          <Form {...form}>
            <form className=" w-full " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4 2xl:grid-cols-5 gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Username"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
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
                {/* <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            {...field}
                            placeholder="Choose iamge"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                /> */}
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
                              value="Superadmin
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
                  {user ? "Update User" : "Add User"}
                  <FaUser className="ml-2 text-white" size={16} />
                </Button>
                {!user && (
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

                {user && (
                  <Alert
                    variant={"default"}
                    className="w-auto h-[50px] ml-8 border-l-[5px]  border-blue-400">
                    <FcInfo className="text-theme" />
                    <AlertDescription className="font-semibold text-blue-400">
                      Update the details of the
                      <span className="ml-2 font-bold text-black">
                        {" "}
                        {JSON.stringify(user.name)}
                      </span>
                    </AlertDescription>
                  </Alert>
                )}
                {user && (
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
        {/* </CommanCardContainer> */}
      </div>
    </div>
  );
};

export default UserFormContainer;
