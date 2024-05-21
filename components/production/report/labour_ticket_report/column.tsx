import { LabourTicketReport } from "@/types";
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

export const Columns: ColumnDef<LabourTicketReport>[] = [
  {
    accessorKey: "transaction_id",
    header: "TransactionId",
  },
  {
    accessorKey: "employee_id",
    header: "EmployeeId",
  },
  {
    accessorKey: "employee_name",
    header: "EmployeeName",
  },
  {
    accessorKey: "attendance_type",
    header: "AttendanceType",
  },
  {
    accessorKey: "project_id",
    header: "ProjectId",
  },
  {
    accessorKey: "work_order_id",
    header: "WorkOrderId",
  },
  {
    accessorKey: "sq_no",
    header: "Sequence No",
  },
  {
    accessorKey: "resource_id",
    header: "Resource No",
  },
  {
    accessorKey: "forman_name",
    header: "Forman Name",
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
          <DialogTitle className="text-white">
            View LabourTicketReport
          </DialogTitle>
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
