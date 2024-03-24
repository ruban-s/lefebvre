"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import type { IconType } from "react-icons";

interface AlertDialogComponentProps {
  alertlableIcon?: IconType;
  alertIcon?: IconType;
  alertlable: string;
  alertheading: string;
  alertdescription: string;
  alertcloseAllFunction?: Function;
  alertactionLable: string;
  alertactionFunction?: Function;
  children?: React.ReactNode;
}

const AlertDialogComponent = ({
  alertlable,
  alertlableIcon: AlertLableIcon,
  alertactionFunction,
  alertactionLable,
  alertdescription,
  alertheading,
  alertIcon: AlertIcon,
  alertcloseAllFunction,
  children,
}: AlertDialogComponentProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <Button
          variant={"ghost"}
          className="w-full  flex justify-between items-center px-2">
          {alertlable}
          {AlertLableIcon && (
            <AlertLableIcon
              className={`${
                alertlable === "View" ? "text-blue-500" : "text-red-500"
              } ml-2`}
            />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive flex justify-start items-center text-md font-semibold ">
            {AlertIcon && <AlertIcon className="mr-4" />}
            {alertheading}
          </AlertDialogTitle>
          {alertdescription.trim() !== "" && (
            <AlertDialogDescription>{alertdescription}</AlertDialogDescription>
          )}
          {children && (
            <AlertDialogDescription>{children}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              alertcloseAllFunction && alertcloseAllFunction();
              //   ref.current?.click();
            }}>
            Cancel
          </AlertDialogCancel>
          {alertactionFunction && (
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => {
                alertactionFunction();
              }}>
              Continue
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
