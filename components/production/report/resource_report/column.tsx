import StatusBadge from "@/components/common/status-badge";
import { ResourceReport } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GrFormView } from "react-icons/gr";
import { statuses } from "@/types/filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Columns: ColumnDef<ResourceReport>[] = [
  {
    accessorKey: "project_id",
    header: "Project ID",
  },
  {
    accessorKey: "work_order_Id",
    header: "Work Order ID",
  },

  {
    accessorKey: "resource_id",
    header: "Resource ID",
  },
  {
    accessorKey: "sq_no",
    header: "Seq No",
  },
  {
    accessorKey: "estimated_hour",
    header: ({ table }) => {
      var Sum = 0;
      table.getRowModel().rows.map((row: any) => {
        Sum += parseInt(row.original.estimated_hour);
      });
      return (
        <span>
          Estimated Hour
          <h1 className="text-black">{`( Total : ${Sum} )`}</h1>
        </span>
      );
    },
  },
  {
    accessorKey: "actual_hour",
    header: ({ table }) => {
      var Sum = 0;
      table.getRowModel().rows.map((row: any) => {
        Sum += parseInt(row.original.actual_hour);
      });
      return (
        <span>
          Actual Hour
          <h1 className="text-black">{`( Total : ${Sum} )`}</h1>
        </span>
      );
    },
  },
  {
    header: "Balanced Hour",
    accessorKey: "balanced_hour",
    cell: ({ row }: { row: any }) => {
      const balancedHour =
        row.original.estimated_hour - row.original.actual_hour;
      return <span>{balancedHour}</span>;
    },
  },
  {
    accessorKey: "required_quantity",
    header: "Required qty",
  },
  {
    accessorKey: "prepared_quantity",
    header: "Prepared qty",
  },
  {
    header: "Balance qty",
    accessorKey: "balanced_quantity",
    cell: ({ row }: { row: any }) => {
      // console.log(row.original);
      const balancedQuantity =
        row.original.required_quantity - row.original.prepared_quantity;
      return <span>{balancedQuantity}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge row={row} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ViewStatus row={row} />;
    },
  },
];

const ViewStatus = ({ row }: any) => {
  const viewData = row.original;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <GrFormView className="text-2xl cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader className="py-2 w-full bg-theme flex justify-center items-center rounded-lg">
          <DialogTitle className="text-white">View ResourceReport</DialogTitle>
        </DialogHeader>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  gap-2">
          {Object.entries(viewData).map(([key, value], index) => {
            return (
              <div
                className={`items-center gap-4 ${
                  key === "variance" || key === "work_order_description"
                    ? "sm:col-span-2 md:col-span-2 lg:col-span-2"
                    : ""
                }`}
                key={index}>
                <div className="mb-1 capitalize">{key}</div>
                <Input disabled value={value as string} />
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
