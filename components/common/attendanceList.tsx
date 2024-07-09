"use client";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllAttendanceType } from "@/data/attendanceType";
import { AttendanceTypeData } from "@/types";
import { RxCaretSort } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

interface AttendanceListProps {
  value: any | undefined;
  onChange: Function;
}

export const AttendanceList = ({ value, onChange }: AttendanceListProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any | undefined>(value);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const data = await getAllAttendanceType();
      return JSON.parse(data.data) as AttendanceTypeData[];
    },
  });
  const attendanceType = data;
  useEffect(() => {
    if (!value) {
      return setValues(undefined);
    }
    if (typeof value === "string") {
      var selectedAttendanceType = attendanceType?.filter((info) => {
        return info.name === value;
      });
      if (selectedAttendanceType) {
        setValues(selectedAttendanceType![0]);
        onChange(selectedAttendanceType![0]);
      }
      return;
    }
    setValues(value);
  }, [value, data]);

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="w-full flex justify-end  items-end"
        onTouchStart={() => {
          setOpen(!open);
        }}>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
          onClick={() => {
            setOpen(!open);
          }}>
          {!values ? "Choose Attendance" : values?.name}

          {!open ? (
            <RxCaretSort className="mb-1" />
          ) : (
            <IoCloseSharp className="mb-1" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList onSelect={() => alert("hi")}>
            {attendanceType?.map((info: AttendanceTypeData, index) => {
              return (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    if (info.id === values?.id) {
                      onChange(undefined);
                      setOpen(!open);

                      return;
                    }
                    onChange(info);
                    setOpen(!open);
                  }}
                  className="flex justify-between items-center">
                  <div className="w-3/4 text-sm font-extrabold text-theme">
                    {info.name}
                  </div>
                  <div
                    className={`w-[15px] h-[15px] rounded-full border-2 border-bg-theme border-spacing-2 ${
                      info.name === values?.name ? "bg-theme" : "bg-white"
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
