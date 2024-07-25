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
import {
  calculateBalanceHoursForFormattedTime,
  formatHoursForFormattedTime,
} from "@/commonfunction";
import { Textarea } from "@/components/ui/textarea";

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
        Sum += parseFloat(row.original.estimated_hour);
      });
      const result = Sum.toFixed(2);
      return (
        <span>
          Estimated Hrs
          <h1 className="text-black">{`( Total : ${result} )`}</h1>
        </span>
      );
    },
    cell: ({ row }) => {
      const estimate =
        row.original.estimated_hour === undefined ||
        row.original.estimated_hour === "" ||
        row.original.estimated_hour.length === 0
          ? "0"
          : formatHoursForFormattedTime(row.original.estimated_hour);
      return <p>{estimate}</p>;
    },
  },
  {
    accessorKey: "actual_hour",
    header: ({ table }) => {
      var Sum = 0;
      table.getRowModel().rows.map((row: any) => {
        Sum += parseFloat(row.original.actual_hour);
      });
      const result = Sum.toFixed(2);
      return (
        <span>
          Actual Hrs
          <h1 className="text-black">{`( Total : ${result} )`}</h1>
        </span>
      );
    },
    cell: ({ row }) => {
      const actual =
        row.original.actual_hour === undefined ||
        row.original.actual_hour === "" ||
        row.original.actual_hour.length === 0
          ? "0"
          : formatHoursForFormattedTime(row.original.actual_hour);
      return <p>{actual}</p>;
    },
  },
  {
    accessorKey: "balanceHour",
    header: ({ table }) => {
      var Sum = 0;
      table.getRowModel().rows.map((row: any) => {
        Sum +=
          parseFloat(row.original.estimated_hour) -
          parseFloat(row.original.actual_hour);
      });
      const result = Sum.toFixed(2);
      return (
        <span>
          Balance Hrs
          <h1 className="text-black">{`( Total : ${result} )`}</h1>
        </span>
      );
    },
    cell: ({ row }) => {
      const balance = calculateBalanceHoursForFormattedTime(
        row.original.estimated_hour,
        row.original.actual_hour
      );
      return (
        <p
          className={`${
            balance.color === "red" ? "text-red-500" : "text-inherit"
          }`}>
          {balance.hours}
        </p>
      );
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
      return (
        <span
          className={balancedQuantity > 0 ? `text-inherit` : `text-red-500`}>
          {balancedQuantity}
        </span>
      );
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
      <DialogContent className="sm:max-w-[600px] h-full max-h-[900px] overflow-auto">
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
                {key === "description" ||
                key === "work_order_description" ||
                key === "forman" ? (
                  <Textarea
                    className="border-2 border-gray-400"
                    disabled
                    value={value as string}
                  />
                ) : (
                  <Input
                    className="border-2 border-gray-400"
                    disabled
                    value={value as string}
                  />
                )}
              </div>
            );
          })}
        </div>
        <DialogFooter className="sticky bottom-0 w-full bg-white">
          <DialogClose className="flex justify-end">
            <Button variant={"secondary"} className="border-2 border-black">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
