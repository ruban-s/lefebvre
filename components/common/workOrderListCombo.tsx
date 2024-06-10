"use client";

import { getAllWorkOrder } from "@/data/work-order";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RxCaretSort } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { use, useEffect, useState } from "react";
import { string } from "zod";
import { WorkOrderData } from "@/types";
import { Checkbox } from "../ui/checkbox";

interface ProjectListComboProps {
  value: any | undefined;
  onChange: Function;
  project_id: string | undefined;
  work_order_id: string | undefined;
}
const WorkOrderListCombo = ({
  value,
  onChange,
  project_id,
  work_order_id,
}: ProjectListComboProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any | undefined>(value);
  const [selectedProjectId, setProject] = useState<string | undefined>(
    project_id
  );

  const {
    data: workOrders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["work-orders"],
    queryFn: async () => {
      const data = await getAllWorkOrder();
      // console.log(JSON.parse(data.data) as WorkOrderData[]);
      const parsedData = JSON.parse(data.data) as WorkOrderData[];
      const filteredData = parsedData.filter(
        (data: any) => data.status !== "Closed"
      );
      return filteredData as WorkOrderData[];
      // return JSON.parse(data.data) as WorkOrderData[];
    },
  });

  useEffect(() => {
    if (!value) {
      return setValues(undefined);
    }
    if (typeof value === "string") {
      var selectedWorkOrder = workOrders?.filter(
        (info) => info.work_order_id === value
      );
      // setValues(selectedWorkOrder![0]);
      onChange(selectedWorkOrder![0]);
      // setValues(value);

      return;
    }
  }, [value]);

  useEffect(() => {
    var projectWorkOreders = workOrders?.filter(
      (info) => info.project_id === project_id
    ) as WorkOrderData[];

    setValues(projectWorkOreders);
  }, [project_id]);

  return (
    <Popover open={open}>
      <PopoverTrigger
        asChild
        className="w-full flex justify-end  items-end"
        onTouchStart={() => {
          setOpen(!open);
        }}>
        <Button
          variant="outline"
          role="combobox"
          className="w-full  justify-between"
          onClick={() => {
            setOpen(!open);
          }}>
          {!work_order_id ? "Choose Work Order" : work_order_id}

          {!open ? (
            <RxCaretSort className="mb-1" />
          ) : (
            <IoCloseSharp className="mb-1" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder={selectedProjectId} className="h-9" />
          <CommandEmpty>No Work Order Found.</CommandEmpty>
          <CommandList>
            {values?.map((info: WorkOrderData, index: any) => {
              return (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    if (info.work_order_id === work_order_id) {
                      onChange(undefined);
                      setOpen(!open);
                      return;
                    }
                    onChange(info);
                    setOpen(!open);
                  }}
                  className="flex justify-between items-center">
                  <div className="w-3/4 text-sm font-extrabold text-theme">
                    {info.work_order_id}
                  </div>
                  <div
                    className={`w-[15px] h-[15px] rounded-full border-2 border-bg-theme border-spacing-2 ${
                      info.work_order_id === work_order_id
                        ? "bg-theme"
                        : "bg-white"
                    }`}></div>
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default WorkOrderListCombo;
