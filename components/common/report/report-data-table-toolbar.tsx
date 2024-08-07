import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./report-data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { RxCross2 } from "react-icons/rx";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchField: string;
  filterColumn?: string;
  title: string;
  options?: {
    label: string;
    value: string;
  }[];
  placeholder: string;
}

export function DataTableToolBar<TData>({
  table,
  searchField,
  filterColumn,
  title,
  options,
  placeholder,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex flex-1 items-center space-x-2">
      <Input
        placeholder={placeholder}
        value={(table.getColumn(searchField)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(searchField)?.setFilterValue(event.target.value)
        }
        className="max-w-sm ml-2 placeholder:capitalize border-2 border-gray-300"
      />
      {options && filterColumn && table.getColumn(filterColumn) && (
        <DataTableFacetedFilter
          column={table.getColumn(filterColumn)}
          title={title}
          options={options}
        />
      )}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3">
          Reset
          <RxCross2 className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
