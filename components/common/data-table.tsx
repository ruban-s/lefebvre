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
import { MdRefresh } from "react-icons/md";
import { BiSolidFileExport } from "react-icons/bi";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import ExportButtonComponent from "./exportButtonComponent";

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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const paginationArray: number[] = [5, 10, 20, 30, 40, 50];

  React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [exportFileName, setExportFileName] = useState<string>(
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
    const workbook = XLSX.utils.book_new();
    const header: any = Object.values(data[0]);
    const body: any = [];
    data.map((info: any, index: number) => body.push(Object.values(info)));
    const ws = XLSX.utils.aoa_to_sheet([header, ...body.slice(1)]);
    XLSX.utils.book_append_sheet(workbook, ws, "Sheet1");
    XLSX.writeFile(workbook, exportFileName + ".xlsx");
  };
  const exportPDF = (value: any) => {
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
  const exportData = (value: string) => {
    if (data.length < 1) {
      return toast.warning(`Data not Found`, {
        description: "You can not export this file",
        position: "top-right",
        dismissible: true,
      });
    }
    const newData = data.map(
      ({ createdDate, updatedDate, updatedBy, token, image, ...rest }: any) =>
        rest
    );
    var exportData: any = [];
    var exportDataField = Object.keys(newData[0] as {});
    var obj: any = {};
    exportDataField.map((info: string, index: any) => {
      obj[`${info}`] = info.toUpperCase();
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

  return (
    <div className="m-2 w-[100%] h-auto pr-4">
      <div className=" w-full  flex items-center py-4">
        <Input
          placeholder={`Search by ${searchName.replace("_", "").toLowerCase()}`}
          value={
            (table.getColumn(searchName)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn(searchName)?.setFilterValue(event.target.value);
          }}
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
              className="ml-auto  flex flex-row space-x-1 text-bold">
              <BiSolidFileExport className="mr-1" /> Export
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-[200px]">
            <ExportButtonComponent
              nameChangeFunction={(value: any) => {
                setExportFileName(value);
              }}
              exportFileName={exportFileName}
              lable="CSV"
              exportFunction={() => {
                exportData("CSV");
              }}
            />
            <ExportButtonComponent
              nameChangeFunction={(value: any) => {
                setExportFileName(value);
              }}
              exportFileName={exportFileName}
              lable="PDF"
              exportFunction={() => {
                exportData("PDF");
              }}
            />
            <ExportButtonComponent
              nameChangeFunction={(value: any) => {
                setExportFileName(value);
              }}
              exportFileName={exportFileName}
              lable="XLSX"
              exportFunction={() => {
                exportData("XLSX");
              }}
            />
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
        <Table className="rounded-none">
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
          {table.getFilteredSelectedRowModel().rows.length.toString()} of{" "}
          {table.getFilteredRowModel().rows.length.toString()} row(s) selected.
        </div>
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
                {paginationArray.map((pageSize: number, index: number) => (
                  <SelectItem key={index} value={`${pageSize}`}>
                    {pageSize.toString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {(table.getState().pagination.pageIndex + 1).toString()} of{" "}
            {table.getPageCount().toString()}
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
