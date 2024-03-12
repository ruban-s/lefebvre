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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardWrapper from "./card-wrapper";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/data/user";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Logo from "./logo";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  interface data {
    status: boolean;
    message: string;
    data: string;
  }

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    const user: data = await getUserById(values);
    if (user.status) {
      toast.success(`${user.message}`, {
        position: "top-right",
        dismissible: true,
      });
    } else {
      toast.error(`${user.message}`, {
        description:
          "Oops! It seems like the credentials you entered are incorrect. Please double-check your username and password and try again",
        position: "top-right",
        dismissible: true,
      });
    }
  };
  return (
    <div className="w-full h-full md:bg-white bg-theme flex  flex-col md:flex-row justify-center items-center">
      <div className="md:hidden relative w-[400px] h-[120px] mb-[10px] rounded-lg shadow-sm shadow-theme-700 ">
        <Logo />
      </div>
      <CardWrapper headerLabel="Welcome Back...">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
          className="w-full"
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
