import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface ViewTabFieldProps {
  heading: string;
  value: string;
  isInput: boolean;
}

const ViewTabField = (props: ViewTabFieldProps) => {
  return (
    <div className="items-center gap-4">
      <div className="mb-1">{props.heading}</div>
      {props.isInput && <Input disabled value={props.value} />}
      {!props.isInput && <Textarea disabled>{props.value}</Textarea>}
    </div>
  );
};

export default ViewTabField;
