// forman_id: number;
// forman_name: string;
// project_id: string;
// description: string;
// customer_name: string;
// work_order_Id: string;
// work_order_description: string;
// sq_no: number;
// resource_id: string;
// bench_mark_measure: number;
// bench_mark_unit: string;
// estimated_hour: string;
// actual_hour: string | null;
// variance: number;
// required_quantity: number;
// prepared_quantity: number | null;
// unit_measure: string;
// efficiency: number;
// status: string;

import StatusBadge from "@/components/common/status-badge";
import { FormanReport } from "@/types";
import { statuses } from "@/types/filter";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Columns: ColumnDef<FormanReport>[] = [
  {
    accessorKey: "project_id",
    header: "ProjectId",
  },
  {
    accessorKey: "customer_name",
    header: "Name",
  },
  {
    accessorKey: "work_order_Id",
    header: "WorkOrderId",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "sq_no",
    header: "SequenceNo",
  },
  {
    accessorKey: "required_quantity",
    header: "RequiredQuantity",
  },
  {
    accessorKey: "unit_measure",
    header: "UnitMeasure",
  },
  {
    accessorKey: "efficiency",
    header: "Efficiency",
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
          <DialogTitle className="text-white">View FormanReport</DialogTitle>
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
