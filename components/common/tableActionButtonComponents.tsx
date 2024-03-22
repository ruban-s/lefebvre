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

interface TableActionButtonComponentsProps {
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
