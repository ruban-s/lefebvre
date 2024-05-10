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
import { Checkbox } from "../ui/checkbox";
import { ProjectData } from "@/types";

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
          <CommandEmpty>No Work Orders Found.</CommandEmpty>
          <CommandList onSelect={() => alert("hi")}>
            {projects?.map((info: ProjectData, index) => {
              return (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    if (info.project_id === values?.project_id) {
                      onChange(undefined);
                      setOpen(!open);

                      return;
                    }
                    onChange(info);
                    setOpen(!open);
                  }}
                  className="flex justify-between items-center">
                  <div className="w-3/4 text-sm font-extrabold text-theme">
                    {info.project_id}
                  </div>
                  <div
                    className={`w-[15px] h-[15px] rounded-full border-2 border-bg-theme border-spacing-2 ${
                      info.project_id === values?.project_id
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

export default ProjectListCombo;
