"use client";

import React, { useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { IconType } from "react-icons";
import AlertDialogComponent from "./alertDialogComponent";
import { GrFormViewHide } from "react-icons/gr";
import CustomImageInput from "./customImageInput";
import { Badge } from "../ui/badge";
import { convertToUAEFormat } from "@/action/common-action";

interface TableActionButtonComponentsProps {
  values?: any;
  primaryLable: string;
  primaryAction: Function;
  primaryIcon: IconType;
  alertlableIcon?: IconType;
  alertIcon?: IconType;
  alertlable: string;
  alertheading: string;
  alertdescription: string;
  alertcloseAllFunction?: Function;
  alertactionLable: string;
  alertactionFunction: Function;
}

const TableActionButtonComponents = ({
  primaryAction,
  primaryIcon: PrimaryIcon,
  primaryLable,
  alertactionFunction,
  alertactionLable,
  alertdescription,
  alertheading,
  alertlable,
  alertIcon: AlertIcon,
  alertcloseAllFunction,
  values,
  alertlableIcon: AlertLebleIcon,
}: TableActionButtonComponentsProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Popover>
        <PopoverTrigger ref={ref} asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only"></span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[150px]">
          <AlertDialogComponent
            alertlable={"View"}
            alertlableIcon={GrFormViewHide}
            alertheading={""}
            alertactionLable={""}
            alertcloseAllFunction={() => {
              alertcloseAllFunction && alertcloseAllFunction();
              ref.current?.click();
            }}
            alertdescription={""}>
            <div className="w-full text-lg ml-1 font-bold text-theme">
              <p>Details:</p>
            </div>

            {Object.keys(values).map((info, index) => {
              // console.log(convertToUAEFormat(values[`${info}`]))
              if (["status", "designation_id"].includes(info)) {
                return (
                  <div
                    key={index}
                    className="w-full h-auto m-2 my-3 flex items-center justify-start">
                    <div className="w-1/4 text-neutral-400">
                      {info.charAt(0).toUpperCase() +
                        info.replace("_", "-").slice(1)}
                    </div>
                    <div className="flex-1 text-bold text-sm  text-black font-bold">
                      {" "}
                      :{" "}
                      <Badge
                        className={`cursor-pointer rounded-md    bg-neutral-500 ${
                          values[info] === "Active" && "bg-green-500"
                        }
                        ${values[info] === "Inactive" && "bg-red-500"}
                     `}>
                        {values[info]}
                      </Badge>
                    </div>
                  </div>
                );
              }
              if (["image_path", "image"].includes(info)) {
                return (
                  <div
                    key={index}
                    className="w-full h-auto m-2 my-3 flex items-center justify-start">
                    <div className="w-1/4 text-neutral-400">
                      {info.charAt(0).toUpperCase() +
                        info.replace("_", "-").slice(1)}
                    </div>
                    {values[info] ? (
                      <CustomImageInput
                        value={values[`${info}`]}
                        disable={true}
                        onChange={(value: string) => {}}
                      />
                    ) : (
                      "--"
                    )}
                  </div>
                );
              }
              if (
                [
                  "forman",
                  "res_note",
                  "token",
                  "res_status",
                  "sq_number",
                  "role_name",
                ].includes(info)
              ) {
                return null;
              }
              return (
                <>
                  <div
                    key={index}
                    className="w-full h-auto m-2 my-3 flex items-center justify-start ">
                    <div className="w-1/4 text-neutral-400">
                      {info.charAt(0).toUpperCase() +
                        info.replace("_", "-").slice(1)}
                    </div>
                    <div className="w-[300px] h-auto  text-pretty flex  text-bold text-sm   text-black font-bold">
                      :{"  "}
                      {info.charAt(0).toUpperCase() +
                        info.replace("_", "-").slice(1) ===
                      "UpdatedDate"
                        ? convertToUAEFormat(values[`${info}`])
                        : info.charAt(0).toUpperCase() +
                            info.replace("_", "-").slice(1) ===
                          "CreatedDate"
                        ? convertToUAEFormat(values[`${info}`])
                        : values[`${info}`] || "--"}
                    </div>
                  </div>
                </>
              );
            })}
          </AlertDialogComponent>
          <Button
            variant={"ghost"}
            className="w-full  flex justify-between items-center px-2"
            onClick={() => {
              primaryAction();
              ref.current?.click();
            }}>
            {primaryLable}
            <PrimaryIcon className="text-yellow-400 ml-2" />
          </Button>
          <AlertDialogComponent
            alertlable={alertlable}
            alertlableIcon={AlertLebleIcon}
            alertheading={alertheading}
            alertIcon={AlertIcon}
            alertactionLable={alertactionLable}
            alertcloseAllFunction={() => {
              alertcloseAllFunction && alertcloseAllFunction();
              ref.current?.click();
            }}
            alertdescription={alertdescription}
            alertactionFunction={() => {
              alertactionFunction();
              ref.current?.click();
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TableActionButtonComponents;
