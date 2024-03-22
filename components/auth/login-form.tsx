"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import { Login } from "@/action/login";
import { Button } from "../ui/button";
import CardWrapper from "./card-wrapper";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    console.log(values);

    await Login(values).then((callback) => {
      if (callback?.error == undefined) {
        toast.success(`Login successfully`, {
          position: "top-right",
          dismissible: true,
        });
      } else {
        toast.error(`${callback?.error}`, {
          description:
            "Oops! It seems like the credentials you entered are incorrect. Please double-check your username and password and try again",
          position: "top-right",
          dismissible: true,
        });
      }
    });
  };
  return (
    <div className="w-full h-full  flex  flex-col md:flex-row justify-center items-center ">
      {/* <div className="relative w-[300px] sm:w-[350px]  md:w-[400px] h-[150px] pt-8  shadow-sm shadow-theme-700  ">
        <Logo />
      </div> */}
      <CardWrapper headerLabel="Welcome Back...">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input type="text" {...field} placeholder="Username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    {/* <FormLabel>Password</FormLabel> */}
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button
              className="w-full bg-theme hover:bg-theme-foreground hover:shadow-md"
              type="submit"
              disabled={
                !form.formState.dirtyFields.password ||
                !form.formState.dirtyFields.username
              }>
              Login
            </Button>
          </form>
        </Form>
        <Button
          variant={"link"}
          className="w-full text-white"
          onClick={() => {
            toast.info(`Forgot Password?`, {
              description:
                "Please contact the administrator to request a password change.",
              position: "top-right",
              dismissible: true,
            });
          }}>
          Forgot Password?
        </Button>
      </CardWrapper>
    </div>
  );
};

export default LoginForm;
