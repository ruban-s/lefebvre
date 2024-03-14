"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import { GiCoffeeCup } from "react-icons/gi";
import { MdOutlineMoreVert } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { CgArrowsBreakeH } from "react-icons/cg";

import { BreaksData } from "@/types";
import { Switch } from "@/components/ui/switch";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

const ListCardContainer = (breaks: BreaksData) => {
  return (
    <Card className=" w-full h-full rounded-none shadow-none border-l-4   border-l-theme  ">
      <CardHeader className="w-full  flex  flex-row justify-between items-center  px-6">
        <div className="flex w-auto justify-between items-center p-1 px-2 bg-theme rounded-sm ">
          <GiCoffeeCup className="text-white" />
          <div className="ml-2 text-white font-normal text-sm">
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
            <div
              className=" p-2 flex justify-between items-center hover:bg-neutral-200 rounded-lg
             hover:shadow-sm cursor-pointer">
              <div className="text-sm font-medium">Edit</div>
              <TbEdit className="text-yellow-400 ml-2" />
            </div>
            <div className=" p-2 flex justify-between items-center hover:bg-neutral-200 rounded-lg hover:shadow-sm cursor-pointer">
              <div className="text-sm font-medium">Delete</div>
              <MdDelete className="text-red-700 ml-2" />
            </div>
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
                value={"demo"}
                checked={breaks.status === "1" ? true : false}
                onCheckedChange={(value) => {
                  alert(value);
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListCardContainer;
