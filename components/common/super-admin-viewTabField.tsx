import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface SuperAdminViewTabFieldProps {
  heading: string;
  value: string;
  isInput: boolean;
  disabled: boolean;
  onValueChange: Function;
}

const SuperAdminViewTabField = (props: SuperAdminViewTabFieldProps) => {
  return (
    <div className="items-center gap-4">
      <div className="mb-1">{props.heading}</div>
      {props.isInput && (
        <Input
          name={props.heading}
          disabled={props.disabled}
          value={props.value}
          onChange={(e) =>
            props.onValueChange(
              { name: e.target.name },
              { value: e.target.value }
            )
          }
        />
      )}
      {!props.isInput && (
        <Textarea disabled={props.disabled} onChange={(e) => console.log(e)}>
          {props.value}
        </Textarea>
      )}
    </div>
  );
};

export default SuperAdminViewTabField;
