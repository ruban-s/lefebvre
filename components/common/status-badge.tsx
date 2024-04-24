/* trunk-ignore-all(prettier) */
import { Badge } from "@/components/ui/badge";

const StatusBadge = ({ row }: { row: any }) => {
  return (
    <Badge
      className={`cursor-pointer rounded-md ${
        row.original.status === "Released" || row.original.status === "Active"
          ? "bg-green-500"
          : row.original.status === "Unreleased" ||
            row.original.status === "Inactive"
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
