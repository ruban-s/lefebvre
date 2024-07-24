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

import { toast } from "sonner";
import { date, object } from "zod";
import ExportButtonComponent from "@/components/common/exportButtonComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/common/dateRangePicker";
import { parse, format } from "date-fns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  searchName: string;
  fileName: string;
  exportDataFields?: string[];
  data: TData[];
  fullexport?: boolean;
  fullData: TData[];
  labourCardFields?: any;
  setRange: Function;
  dateRange: any;
  fromDate: any;
  toDate: any;
  disabledDates: any;
}

export function LabourCardDataTable<TData, TValue>({
  fullData,
  columns,
  searchName,
  fileName,
  data,
  setRange,
  fullexport = false,
  exportDataFields,
  labourCardFields,
  dateRange,
  fromDate,
  toDate,
  disabledDates,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const paginationArray: number[] = [10, 20, 30, 40, 50];

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
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  //CSV Export
  // const exportCSV = (value: any) => {
  //   var newData: any = [];
  //   value.map(({ createdDate, updatedDate, ...info }: any, index: any) => {
  //     return newData.push({
  //       ...info,
  //       createdDate:
  //         createdDate !== null
  //           ? createdDate.toString().replaceAll(",", "/")
  //           : "null",
  //       updatedDate: updatedDate.toString().replaceAll(",", "/"),
  //     });
  //   });
  //   const csvContent =
  //     "data:text/csv;charset=utf-8," +
  //     newData.map((row: any) => Object.values(row).join(",")).join("\n");
  //   const encodedUri = encodeURI(csvContent);
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodedUri);
  //   link.setAttribute("download", `${exportFileName}.csv`);
  //   document.body.appendChild(link);
  //   link.click();
  // };
  const exportCSV = (value: any[]) => {
    const processValue = (val: any): string => {
      if (Array.isArray(val)) {
        return `"${val.join(" - ")}"`;
      }
      if (typeof val === "string") {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val !== null && val !== undefined ? String(val) : "";
    };

    const newData = value.map(({ createdDate, updatedDate, ...info }: any) => ({
      ...info,
      createdDate:
        createdDate && createdDate !== null
          ? createdDate.toString().replace(/,/g, "/")
          : "null",
      updatedDate: updatedDate
        ? updatedDate.toString().replace(/,/g, "/")
        : "null",
    }));

    const headers = Object.keys(newData[0]);
    const csvRows = [
      headers.join(","),
      ...newData.map((row) =>
        headers.map((header) => processValue(row[header])).join(",")
      ),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${exportFileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const exportXLSX = (data: any) => {
    const workbook = XLSX.utils.book_new();
    const header: any = Object.values(data[0]);
    const body: any = [];
    let dateHeader: any = [new Date().toLocaleDateString()];
    if (fromDate !== undefined) {
      dateHeader.pop();
      dateHeader.push(fromDate?.toLocaleDateString());
    }
    if (toDate !== undefined) {
      dateHeader.push("-");
      dateHeader.push(toDate?.toLocaleDateString());
    }
    data.map((info: any, index: number) => body.push(Object.values(info)));
    const ws = XLSX.utils.aoa_to_sheet([dateHeader, header, ...body.slice(1)]);
    XLSX.utils.book_append_sheet(workbook, ws, "Sheet1");
    XLSX.writeFile(workbook, exportFileName + ".xlsx");
  };
  const exportPDF = (value: any) => {
    var headerList = Object.keys(value[0]);
    var header: any = [[]];
    var body: any = [];
    headerList.map((info: string, index) => {
      header[0].push(
        `${
          info.replaceAll("_", " ").charAt(0).toUpperCase() +
          info
            .replaceAll("_", " ")
            .slice(1)
            .replace(/([a-z])([A-Z])/g, "$1 $2")
        }`
      );
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
      styles: { minCellWidth: 15 },
      horizontalPageBreak: true,
      // horizontalPageBreakRepeat: header[0][0],
      horizontalPageBreakBehaviour: "immediately",
      didDrawPage: function (data: any) {
        const docAny: any = doc;
        const pageCount = docAny.internal.getNumberOfPages();
        const pageWidth = docAny.internal.pageSize.width;
        docAny.setFontSize(10);
        const textWidth =
          (docAny.getStringUnitWidth("Page " + pageCount) *
            docAny.internal.getFontSize()) /
          docAny.internal.scaleFactor;
        const xPos = (pageWidth - textWidth) / 2;
        docAny.text(
          "Page " + pageCount,
          xPos,
          docAny.internal.pageSize.height - 10
        );
      },
    });
    doc.save(exportFileName + ".pdf");
  };
  const exportData = (value: string, dataField: string[]) => {
    if (data.length < 1) {
      return toast.warning(`Data not Found`, {
        description: "You can not export this file",
        position: "top-right",
        dismissible: true,
      });
    }
    var obj1: any = {};
    var exportData: any = [];
    dataField.map((field: string, fieldIndex) => {
      obj1[`${field}`] =
        field.replaceAll("_", " ").charAt(0).toUpperCase() +
        field
          .replaceAll("_", " ")
          .slice(1)
          .replace(/([a-z])([A-Z])/g, "$1 $2");
    });
    exportData.push(obj1);
    data.map((info: any, index) => {
      var obj2: any = {};
      dataField.map((field: string, fieldIndex) => {
        obj2[`${field}`] = info[`${field}`];
      });
      exportData.push(obj2);
    });

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

  return (
    <div className=" ml-auto mr-auto w-[375px]  sm:w-[500px] md:w-[720px] lg:w-[100%]  h-auto pr-4 mb-6">
      {data === undefined ? (
        <div className="ml-2 py-2">
          <Table className="rounded-none">
            <TableHeader className="border rounded-md bg-blue-50">
              <TableRow>
                <TableHead
                  colSpan={columns.length}
                  className="font-semibold text-them">
                  Data not found.
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
      ) : (
        <div className="w-[100%]">
          <div className=" w-[100%]  flex items-center py-4">
            <Input
              placeholder={`Search by ${searchName
                .replaceAll("_", " ")
                .toLowerCase()}`}
              value={
                (table.getColumn(searchName)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                table.getColumn(searchName)?.setFilterValue(event.target.value);
              }}
              className="max-w-sm ml-2 placeholder:capitalize"
            />

            <Button
              className="ml-2 mr-auto "
              variant={"secondary"}
              onClick={() => {
                // table.setPageSize(Number(5));
                table.resetColumnVisibility();
                table.resetRowSelection();
                table.resetColumnFilters();
                table.resetPagination();
                setRange({
                  from: new Date(),
                  to: undefined,
                });
              }}>
              <MdRefresh />
            </Button>
            <span className="ml-auto">
              <DatePickerWithRange
                onselect={setRange}
                selectedData={dateRange!}
                fromDate={fromDate}
                toDate={toDate}
                disabled={disabledDates}
              />
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-2  flex flex-row space-x-1 text-bold"
                  disabled={data.length === 0}>
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
                  exportFunction={(value: string[]) => {
                    exportData("CSV", value);
                  }}
                  exportDataFields={exportDataFields}
                  data={data}
                  fullexport={fullexport}
                  labourCardFields={labourCardFields}
                />
                <ExportButtonComponent
                  nameChangeFunction={(value: any) => {
                    setExportFileName(value);
                  }}
                  exportFileName={exportFileName}
                  lable="PDF"
                  exportFunction={(value: string[]) => {
                    exportData("PDF", value);
                  }}
                  exportDataFields={exportDataFields}
                  data={data}
                  fullexport={fullexport}
                  labourCardFields={labourCardFields}
                />
                <ExportButtonComponent
                  nameChangeFunction={(value: any) => {
                    setExportFileName(value);
                  }}
                  exportFileName={exportFileName}
                  lable="XLSX"
                  exportFunction={(value: string[]) => {
                    exportData("XLSX", value);
                  }}
                  exportDataFields={exportDataFields}
                  fullexport={fullexport}
                  data={data}
                  labourCardFields={labourCardFields}
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
                        {column.id === "role_name"
                          ? "role".toString().replace("_", " ")
                          : column.id === "res_description"
                          ? "Description"
                          : column.id === "unit"
                          ? " Unit Measure "
                          : column.id === "res_note"
                          ? "Note"
                          : column.id === "indirectCode"
                          ? "Indirect Code ID"
                          : column.id === "name"
                          ? fileName === "Attendance-Type"
                            ? "Attendance Type"
                            : "GL-Code"
                          : column.id.toString().replace("_", " ")}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className=" w-[100%] rounded-md ml-2 border">
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
                {/* <TableRow>
              <TableCell>
                {table.getRowModel().rows?.length.toString()}
              </TableCell>
            </TableRow> */}
                {data?.length < 1 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
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
            <div className="flex-1 text-[8px] md:text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length.toString()} of{" "}
              {table.getFilteredRowModel().rows.length.toString()} row(s)
              selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <p className="text-[8px] md:text-sm font-medium">
                  Rows per page
                </p>
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
      )}
    </div>
  );
}
