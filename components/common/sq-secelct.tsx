import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FieldArrayWithId, UseFormReturn } from "react-hook-form";

interface SqSelectProps {
  value: string;
  index: any;
  resourceId: string;
  fields: FieldArrayWithId[];
  onChange: Function;
}

const SqSelect = ({
  value,
  index,
  resourceId,
  fields,
  onChange,
}: SqSelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        onChange(value);
      }}>
      <SelectTrigger>
        <SelectValue placeholder="Select Seq No" />
      </SelectTrigger>
      <SelectContent>
        {["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"].map(
          (info, item) => {
            return (
              <SelectItem value={info} key={item}>
                {info}
              </SelectItem>
            );
          }
        )}
      </SelectContent>
    </Select>
  );
};

export default SqSelect;
