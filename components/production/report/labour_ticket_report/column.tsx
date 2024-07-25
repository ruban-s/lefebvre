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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RxCaretSort } from "react-icons/rx";

export const Columns: ColumnDef<LabourTicketReport>[] = [
  {
    accessorKey: "transaction_id",
    header: "Transaction Id",
  },
  {
    accessorKey: "employee_id",
    header: "Employee Id",
  },
  {
    accessorKey: "employee_name",
    header: "Employee Name",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "gl_code",
    header: "GL Code",
    cell: ({ row }) => {
      console.log(row.original);
      return (
        <div>
          {!row.original.gl_code ? "--" : <p>{row.original.gl_code}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: "gl_description",
    header: "GL Description",
    cell: ({ row }) => (
      <>
        {row.original.gl_description === null && <p>--</p>}
        {row.original.gl_description &&
        row.original.gl_description.length > 0 ? (
          <div className="flex justify-start items-center">
            {row.original.gl_description.substring(0, 15)}{" "}
            {row.original.gl_description.length > 15 && "..."}
            {row.original.gl_description.length > 15 && (
              <Popover>
                <PopoverTrigger className="bg-neutral-200 p-1 rounded-sm ">
                  <RxCaretSort className="text-theme" size={20} />
                </PopoverTrigger>

                <PopoverContent className="w-[400px] ">
                  <p className="mb-2 text-bold">Description:</p>
                  <p className="text-sm text-neutral-500">
                    {row.original.gl_description}
                  </p>
                </PopoverContent>
              </Popover>
            )}
          </div>
        ) : (
          <div>--</div>
        )}
      </>
    ),
  },
  {
    accessorKey: "project_id",
    header: "Project Id",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.project_id ? "--" : <p>{row.original.project_id}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: "work_order_id",
    header: "Work Order Id",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.work_order_id ? (
            "--"
          ) : (
            <p>{row.original.work_order_id}</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "resource_id",
    header: "Resource Id",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.resource_id ? "--" : <p>{row.original.resource_id}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: "in_time",
    header: "In Time",
  },
  {
    accessorKey: "out_time",
    header: "OutTime",
    cell: ({ row }) => {
      return (
        <p>
          {row.original.out_time === null || row.original.out_time.length === 0
            ? "--"
            : row.original.out_time}
        </p>
      );
    },
  },
  {
    accessorKey: "prepared_quantity",
    header: "Prepared Quantity",
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.prepared_quantity ? (
            "--"
          ) : (
            <p>{row.original.prepared_quantity}</p>
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "punch_out_time",
  //   header: "Out Time",
  //   cell: ({ row }) => {
  //     return (
  //       <div>
  //         {!row.original.punch_out_time ? (
  //           "--"
  //         ) : (
  //           <p>{row.original.punch_out_time}</p>
  //         )}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "forman_name",
    header: "Forman",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ViewStatus row={row} />;
    },
  },
];

const ViewStatus = ({ row }: any) => {
  // console.log(row.original);
  const viewData = row.original;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <GrFormView className="text-2xl" />
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl max-h-[90%] overflow-y-auto">
        <DialogHeader className="py-2 w-full bg-theme flex justify-center items-center rounded-lg">
          <DialogTitle className="text-white">
            View LabourTicketReport
          </DialogTitle>
        </DialogHeader>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-2">
          {Object.entries(viewData).map(([key, value], index) => {
            return (
              <div className="items-center gap-4" key={index}>
                <div className="mb-1 capitalize">{key}</div>
                <Input
                  className="border-2 border-gray-400"
                  disabled
                  value={value as string}
                />
              </div>
            );
          })}
        </div>
        <DialogFooter className="sticky bottom-0 left-0 ">
          <DialogClose>
            <Button variant={"secondary"} className="border-2 border-black">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
