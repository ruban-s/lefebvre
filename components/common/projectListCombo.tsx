"use client";

import { getAllProject } from "@/data/projects";
// import { any } from "@/types";
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

interface ProjectListComboProps {
  value: any | undefined;
  onChange: Function;
}
const ProjectListCombo = ({ value, onChange }: ProjectListComboProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any | undefined>(value);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await getAllProject();
      return JSON.parse(data.data) as any[];
    },
  });
  const projects = data;

  useEffect(() => {
    if (!value) {
      return setValues(undefined);
    }
    if (typeof value === "string") {
      var selectedProject = projects?.filter(
        (info) => info.project_id === value
      );
      setValues(selectedProject![0]);
      onChange(selectedProject![0]);
      return;
    }
    setValues(value);
  }, [value]);

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
          {!values ? "Choose Project" : values?.project_id}

          {!open ? (
            <RxCaretSort className="mb-1" />
          ) : (
            <IoCloseSharp className="mb-1" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search Project..." className="h-9" />
          <CommandEmpty>No Project Found.</CommandEmpty>
          <CommandList onSelect={() => alert("hi")}>
            {projects?.map((info: any, index) => {
              return (
                <CommandItem
                  key={index}
                  className={`w-full h-full hover:none selection:hover:none selection:bg-none hover:bg-none flex justify-center items-center ${
                    values?.project_id === info.project_id &&
                    "bg-green-50 text-green-500 hover:bg-none"
                  } `}
                  onSelect={() => {
                    onChange(info);
                    setOpen(!open);
                  }}>
                  <p
                    className={`text-sm font-bold ${
                      values?.project_id === info.project_id && "ml-auto"
                    }`}>
                    {info.project_id}
                  </p>
                  <div className="w-[20px]">
                    {values?.project_id === info.project_id && (
                      <IoCloseSharp
                        className="ml-auto text-red-500 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange(undefined);
                          setOpen(!open);
                        }}
                      />
                    )}
                  </div>
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectListCombo;
