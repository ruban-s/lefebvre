"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FaFileCsv } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXlsx } from "react-icons/bs";
import { Input } from "../ui/input";

interface ExportButtonComponentProps {
  lable: string;
  exportFunction: Function;
  exportFileName: string;
  nameChangeFunction: Function;
}

const ExportButtonComponent = ({
  lable,
  exportFunction,
  exportFileName,
  nameChangeFunction,
}: ExportButtonComponentProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto  w-full" variant={"ghost"}>
          {lable === "CSV" && <FaFileCsv className="mr-1" />}
          {lable === "PDF" && <FaFilePdf className="mr-1" />}
          {lable === "XLSX" && <BsFiletypeXlsx className="mr-1" />} Export{" "}
          {lable}
        </Button>
      </DialogTrigger>
      <DialogContent className="ml-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export {lable}</DialogTitle>
          <DialogDescription>
            You can export this fila as a {lable}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <p className="sr-only">File Name:</p>
            <Input
              value={exportFileName}
              onChange={(value) => nameChangeFunction(value.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              className="bg-theme"
              onClick={() => exportFunction()}>
              <FaFileCsv className="mr-1" /> Export {lable}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportButtonComponent;
