/* trunk-ignore-all(prettier) */
"use client";
import React, { useState } from "react";
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
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface ExportButtonComponentProps {
  lable: string;
  exportFunction: Function;
  exportFileName: string;
  nameChangeFunction: Function;
  exportDataFields?: string[];
  data: any[];
  fullexport?: boolean;
  labourCardFields?: any;
}

const ExportButtonComponent = ({
  lable,
  exportFunction,
  exportFileName,
  nameChangeFunction,
  exportDataFields,
  data,
  labourCardFields,
  fullexport = false,
}: ExportButtonComponentProps) => {
  console.log(data);
  const [selectedFields, setSelectedFields] = useState<string[] | undefined>(
    exportDataFields!
  );
  var defaultFiedls: string[] | undefined = Object.keys(data[0]!);
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
      <DialogContent className="w-[600px]">
        <DialogHeader>
          <DialogTitle>Export {lable}</DialogTitle>
          <DialogDescription>
            You can export this fila as a {lable}.
          </DialogDescription>
        </DialogHeader>
        {!fullexport && <div>Available Data Fields :</div>}{" "}
        {!fullexport && (
          <div className="grid grid-cols-3 gap-2">
            {defaultFiedls.map((info, index) => {
              if (
                info === "image" ||
                info === "images" ||
                info === "image+path" ||
                info === "attachment"
              )
                return;
              return (
                <div className="p-2 mx-2 border border-1 " key={index}>
                  <Checkbox
                    className="mr-2"
                    id={info}
                    checked={selectedFields?.includes(info)}
                    onCheckedChange={(value) => {
                      if (value) {
                        setSelectedFields((items) => [...items!, info!]);
                      } else {
                        var data = selectedFields?.filter(
                          (item) => item !== info
                        );
                        setSelectedFields((items) => [...data!]);
                      }
                    }}
                  />
                  <Label htmlFor={info}>
                    {info === "forman"
                      ? "Foreman"
                      : info.replaceAll("_", " ").charAt(0).toUpperCase() +
                        info
                          .replaceAll("_", " ")
                          .slice(1)
                          .replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </Label>
                </div>
              );
            })}
          </div>
        )}
        {
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <p className="sr-only">File Name:</p>
              <Input
                value={exportFileName}
                onChange={(value) => nameChangeFunction(value.target.value)}
              />
            </div>
          </div>
        }
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
              onClick={() => {
                if (fullexport && labourCardFields) {
                  exportFunction(labourCardFields);
                } else if (fullexport) {
                  exportFunction(defaultFiedls);
                } else {
                  exportFunction(selectedFields);
                }
              }}>
              <FaFileCsv className="mr-1" /> Export {lable}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportButtonComponent;
