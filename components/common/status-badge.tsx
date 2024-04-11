import React from "react";
import { Badge } from "../ui/badge";

const StatusBadge = ({ row }: { row: any }) => {
  return (
    <Badge
      className={`cursor-pointer rounded-md ${
        row.original.status === "Released"
          ? "bg-green-500"
          : row.original.status === "Unreleased"
          ? "bg-red-500"
          : row.original.status === "Canceled"
          ? "bg-orange-500"
          : "bg-black"
      }`}>
      {row.original.status}
    </Badge>
  );
};

export default StatusBadge;
