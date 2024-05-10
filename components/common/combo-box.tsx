"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
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

const jobPositions = [
  "PRODUCTION CO-ORDINATOR",
  "FOREMAN",
  "TEAM LEADER",
  "QC INSPECTOR",
  "FABRICATOR",
  "FABRICATOR/WELDER",
  "MIG WELDER",
  "TACK WELDER",
  "MIG / TIG WELDER",
  "HELPER",
  "RIGGER",
  "MACHINE OPERATOR",
  "MAINTENANCE",
  "CNC MACHINIST",
  "SAW OPERATOR",
  "BENDING OPERATOR",
  "ROLLING OPERATOR",
  "HSE",
  "SECURITY",
  "STORE KEEPER",
  "DRIVER",
  "FORKLIFT DRIVER",
  "PAINTER",
  "SAND BLASTER",
  "OFFICE CLEANER",
  "CAMP CLEANER",
  "FITTER",
];

export function ComboboxPopover({ select }: { select: Function }) {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild className="w-auto ml-2">
        <Button
          variant="secondary"
          role="combobox"
          className="w-auto justify-between"
          onClick={() => setOpen(!isOpen)}>
          {!isOpen ? <RxCaretSort /> : <IoCloseSharp />}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search Designation..." className="h-9" />
          <CommandEmpty>No Designation found.</CommandEmpty>
          <CommandList onSelect={() => alert("hi")}>
            {jobPositions.map((info, index) => {
              return (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    select(info);
                    setOpen(!isOpen);
                  }}>
                  <p className="text-sm">{info}</p>
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
