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
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteBreak, updateBreak } from "@/data/break";
import TableActionButtonComponents from "@/components/common/tableActionButtonComponents";
import { IoIosWarning } from "react-icons/io";
import { deleteResource } from "@/data/resources";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

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
      queryClient.invalidateQueries({ queryKey: ["break"] });
    },
    onError: (value) => {
      toast.error(`Something went wrong`, {
        position: "top-right",
        dismissible: true,
      });
    },
  });
  const deleteItem = useMutation({
    mutationFn: async (value: any) => {
      const deleteCode: any = await deleteBreak(value);
      return deleteCode;
    },
    onSuccess: (value) => {
      if (value?.status) {
        toast.success(`${value.message}`, {
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

        <TableActionButtonComponents
          primaryLable="Edit"
          primaryAction={() => {
            props.editBreak(breaks);
          }}
          primaryIcon={TbEdit}
          alertlable="Delete"
          alertlableIcon={MdDelete}
          alertheading=" Are you absolutely sure?"
          alertIcon={IoIosWarning}
          alertactionLable="Delete"
          alertcloseAllFunction={() => {}}
          alertdescription="  This action cannot be undone. This will permanently delete
                    your data and remove from our server."
          alertactionFunction={() => {
            deleteItem.mutate(`${breaks.id}`);
          }}
        />
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
            <div className="flex  justify-between items-center  flex-col ">
              <Switch
                className={`${
                  breaks.status === "Active" && "bg-green"
                } data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-neutral-300`}
                value={"demo"}
                checked={breaks.status === "Active" ? true : false}
                onCheckedChange={changeStatus}
              />
              <Badge
                className={`cursor-pointer rounded-md mt-2 ${
                  breaks.status === "Active" ? "bg-green-500" : "bg-red-500"
                }`}>
                {breaks.status}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListCardContainer;
