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

/*
project_id: string;
  description: string;
  customer_name: string;
  work_order_Id: string;
  work_order_description: string;
  sq_no: string;
  resource_id: string;
  bench_mark_measure: string;
  bench_mark_unit: string;
  estimated_hour: string;
  actual_hour: string;
  variance: string;
  required_quantity: string;
  prepared_quantity: string;
  unit_measure: string;
  forman: string;
  status: string;

*/
export const Columns: ColumnDef<ResourceReport>[] = [
  {
    accessorKey: "project_id",
    header: "Project ID",
  },
  {
    accessorKey: "work_order_Id",
    header: "Work Order Id",
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
    accessorKey: "bench_mark_measure",
    header: "Bench Mark Measure",
  },
  {
    accessorKey: "bench_mark_unit",
    header: "Bench Mark Unit",
  },
  {
    accessorKey: "estimated_hour",
    header: "Estimated Hours",
  },

  {
    accessorKey: "required_quantity",
    header: "Required Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );
      if (!status) {
        return null;
      }
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
        <GrFormView className="text-2xl" />
      </DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader className="py-2 w-full bg-theme flex justify-center items-center rounded-lg">
          <DialogTitle className="text-white">View WorkOrder</DialogTitle>
        </DialogHeader>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  gap-2">
          {Object.entries(viewData).map(([key, value], index) => {
            return (
              <div className="items-center gap-4" key={index}>
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
