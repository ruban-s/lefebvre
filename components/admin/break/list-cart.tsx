"use client";

import { Card, CardContent, CardHeader } from "../../ui/card";
import { GiCoffeeCup } from "react-icons/gi";
import { MdOutlineMoreVert } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { CgArrowsBreakeH } from "react-icons/cg";

import { BreaksData } from "@/types";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateBreak } from "@/data/break";

interface ListCardContainerProps {
  breaks: BreaksData;
  editBreak: Function;
}

const ListCardContainer = (props: ListCardContainerProps) => {
  const queryClient = useQueryClient();
  const breaks = props.breaks;

  const creatBreak = useMutation({
    mutationFn: async (data: any) => {
      const breake = await updateBreak(data);
      return breake;
    },
    onSuccess: (value) => {
      toast.success(`${value.message}`, {
        position: "top-right",
        dismissible: true,
      });
      queryClient.invalidateQueries({ queryKey: ["breaks"] });
    },
    onError: (value) => {
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const changeStatus = (value: any) => {
    const { createdDate, updatedDate, ...newData } = breaks;
    const payload = {
      ...newData,
      status: breaks.status !== "Active" ? "Active" : "Inactive",
    };
    creatBreak.mutate(payload);
  };
  return (
    <Card
      className={` w-full h-full rounded-lg shadow-none border-l-4     ${
        breaks.status === "Active"
          ? "border-l-green-500 border-green-500"
          : "border-l-neutral-500 border-neutral-500"
      } `}>
      <CardHeader className="w-full  flex  flex-row justify-between items-center  px-6">
        <div className="flex w-auto justify-between items-center p-1 px-2 bg-blue-50 rounded-sm ">
          <GiCoffeeCup className="text-theme" />
          <div className="ml-2 text-theme font-semibold text-sm">
            {breaks.name}
          </div>
        </div>

        <Popover>
          <Button variant={"secondary"} asChild>
            <PopoverTrigger>
              <MdOutlineMoreVert />
            </PopoverTrigger>
          </Button>
          <PopoverContent className="w-[200px] rounded-xl">
            <Button
              variant={"ghost"}
              className="w-full justify-between"
              onClick={() => {
                props.editBreak(breaks);
              }}>
              <div className="text-sm font-medium">Edit</div>
              <TbEdit className="text-yellow-400 ml-2" />
            </Button>
            <Button variant={"ghost"} className="w-full justify-between">
              <div className="text-sm font-medium">Delete</div>
              <MdDelete className="text-red-700 ml-2" />
            </Button>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <div className="w-ful p-0 m-0 flex flex-row justify-between items-center">
          <div className="w-[35%]  h-[80px] flex flex-col justify-between items-start">
            <div className="w-full h-[38.5px] flex justify-center items-center bg-blue-50 rounded-tl-lg  shadow-sm    rounded-tr-lg ">
              <div className="text-sm font-bold text-theme">Start Time</div>
            </div>

            <div className="w-full h-[38.5px] flex justify-center items-center bg-blue-50 rounded-bl-lg  shadow-sm    rounded-br-lg ">
              <FaRegClock className="text-theme" size={20} />
              <div className="text-sm font-bold text-theme ml-2">
                {breaks.start_time}
              </div>
            </div>
          </div>
          <CgArrowsBreakeH className="mx-4 text-theme" size={20} />
          <div className="w-[35%] h-[80px] flex flex-col justify-between items-start">
            <div className="w-full h-[38.5px] flex justify-center items-center bg-blue-50 rounded-tl-lg  shadow-sm    rounded-tr-lg ">
              <div className="text-sm font-bold text-theme">End Time</div>
            </div>

            <div className="w-full h-[38.5px] flex justify-center items-center bg-blue-50 rounded-bl-lg  shadow-sm    rounded-br-lg ">
              <FaRegClock className="text-theme" size={20} />
              <div className="text-sm font-bold text-theme ml-2">
                {breaks.end_time}
              </div>
            </div>
          </div>
          <div className="flex-1 flex  justify-end items-center">
            <div className="flex justify-between items-center  flex-row ">
              <Switch
                className={`${
                  breaks.status === "Active" && "bg-green"
                } data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-neutral-300`}
                value={"demo"}
                checked={breaks.status === "Active" ? true : false}
                onCheckedChange={changeStatus}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListCardContainer;
