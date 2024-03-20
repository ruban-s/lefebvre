"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RxMixerHorizontal } from "react-icons/rx";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import { BiSolidFileExport } from "react-icons/bi";
import { FaFileCsv } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXlsx } from "react-icons/bs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";

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
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  searchName: string;
  fileName: string;
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  searchName,
  fileName,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [exportFileName, setExportFileName] = React.useState<string>(
    `${fileName}-${new Date().toISOString().replace(/:/g, "-")}`
  );

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  //CSV Export
  const exportCSV = (value: any) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      value.map((row: any) => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${exportFileName}.csv`);
    document.body.appendChild(link);
    link.click();
  };
  const exportXLSX = (data: any) => {
    data.shift();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    XLSX.writeFile(workbook, exportFileName + ".xlsx");
  };
  const exportData = (value: string) => {
    if (data.length < 1) {
      return toast.warning(`Data not Found`, {
        description: "You can not export this file",
        position: "top-right",
        dismissible: true,
      });
    }
    const newData = data.map(
      ({ createdDate, updatedDate, token, image, ...rest }: any) => rest
    );
    var exportData: any = [];
    var exportDataField = Object.keys(newData[0] as {});
    var obj: any = {};
    exportDataField.map((info: any, index: any) => {
      obj[`${info}`] = info;
    });
    exportData.push(obj);
    exportData = [...exportData, ...newData];
    if (value === "CSV") {
      exportCSV(exportData);
    }
    if (value === "XLSX") {
      exportXLSX(exportData);
    }
    if (value === "PDF") {
      exportPDF(exportData);
    }
    setExportFileName(
      `${fileName}-${new Date().toISOString().replace(/:/g, "-")}`
    );
  };

  useEffect(() => {
    table.setPageSize(Number(5));
  }, []);

  const exportPDF = (value: any) => {
    console.log(value);
    var headerList = Object.keys(value[0]);
    var header: any = [[]];
    var body: any = [];

    headerList.map((info: string, index) => {
      header[0].push(info.replace("_", "").toUpperCase());
    });
    value.map((info: any, index: any) => {
      if (index > 0) {
        return body.push(Object.values(info));
      }
    });

    const doc = new jsPDF({ orientation: "landscape" });
    autoTable(doc, {
      head: header,
      body: body,
      theme: "grid",
    });
    doc.save(exportFileName + ".pdf");
  };
  return (
    <div className="m-2 w-[100%] h-auto pr-4">
      <div className=" w-full  flex items-center py-4">
        <Input
          placeholder="Search by Name"
          value={
            (table.getColumn(searchName)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchName)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Button
          className="ml-2 mr-auto "
          variant={"secondary"}
          onClick={() => {
            table.resetColumnVisibility();
            table.resetRowSelection();
            table.resetColumnFilters();
            table.resetPagination();
          }}>
          <MdRefresh />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-2  flex flex-row space-x-1 text-bold">
              <BiSolidFileExport className="mr-1" /> Export
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-[200px]">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-auto  w-full" variant={"ghost"}>
                  <FaFileCsv className="mr-1" /> Export CSV
                </Button>
              </DialogTrigger>
              <DialogContent className="ml-auto sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Export CSV</DialogTitle>
                  <DialogDescription>
                    You can export this fila as a CSV.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <p className="sr-only">File Name:</p>
                    <Input
                      value={exportFileName}
                      onChange={(value) =>
                        setExportFileName(value.target.value)
                      }
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="default"
                      className="bg-theme"
                      onClick={() => exportData("CSV")}>
                      <FaFileCsv className="mr-1" /> Export CSV
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-auto  w-full" variant={"ghost"}>
                  <FaFilePdf className="mr-1" /> Export PDF
                </Button>
              </DialogTrigger>
              <DialogContent className="ml-auto sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Export PDF</DialogTitle>
                  <DialogDescription>
                    You can export this fila as a PDF.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <p className="sr-only">File Name:</p>
                    <Input
                      value={exportFileName}
                      onChange={(value) =>
                        setExportFileName(value.target.value)
                      }
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="default"
                      className="bg-theme"
                      onClick={() => exportData("PDF")}>
                      <FaFilePdf className="mr-1" /> Export PDF
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-auto  w-full" variant={"ghost"}>
                  <BsFiletypeXlsx className="mr-1" /> Export XSLX
                </Button>
              </DialogTrigger>
              <DialogContent className="ml-auto sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Export XSLX</DialogTitle>
                  <DialogDescription>
                    You can export this fila as a XLSX.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <p className="sr-only">File Name:</p>
                    <Input
                      value={exportFileName}
                      onChange={(value) =>
                        setExportFileName(value.target.value)
                      }
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="default"
                      className="bg-theme"
                      onClick={() => exportData("XLSX")}>
                      <BsFiletypeXlsx className="mr-1" /> Export XLSX
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-2  flex flex-row space-x-1 text-bold">
              <RxMixerHorizontal className="mr-1" /> View
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table id="tables">
          <TableHeader className="bg-blue-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-semibold text-them">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody defaultValue={5}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="even:bg-neutral-100  odd:bg-white"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between ml-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of
          {table.getFilteredRowModel().rows.entries()} row(s) selected.
        </div>
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          Next
        </Button> */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}>
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to first page</span>
              <MdKeyboardDoubleArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to previous page</span>
              <FaAngleLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to next page</span>
              <FaAngleRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to last page</span>
              <MdKeyboardDoubleArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
