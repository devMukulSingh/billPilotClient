import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import { Table as TTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Button } from '../ui/button';
import { cn } from '~/lib/utils';

interface DataTableProps<TData, TValue> {
  className?:string
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  renderSubComponent: (props: { row: Row<TData> }) => React.ReactElement;
}

export  function DataTable<TData, TValue>({
  columns,
  data,
  className,
  renderSubComponent,
}: DataTableProps<TData, TValue>) {
  // console.log("rerender",data);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
    const table = useReactTable({
      data: data || [],
      onStateChange() {},
      columns,
      getCoreRowModel: getCoreRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getRowCanExpand: () => true,
      getPaginationRowModel: getPaginationRowModel(),
      manualFiltering: true,
      onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
      state: {
        //...
        pagination,
      },
      initialState: {
        pagination: {
          pageIndex: 1, //custom initial page index
          pageSize: 10, //custom default page size
        },
      },
    });
  return (
    <div className={cn(className,`px-5 rounded-md flex flex-col  gap-5 `)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow className="bg-white hover:bg-neutral-100">
                    <TableCell align="right" colSpan={2}>
                      {renderSubComponent({ row })}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationButtons table={table} />
    </div>
  );
}

function PaginationButtons<TData>({ table }: { table: TTable<TData> }) {
  return (
    <div className=" flex justify-center gap-5 mt-auto">
      <Button
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<<'}
      </Button>
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<'}
      </Button>
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>'}
      </Button>
      <Button
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </Button>
    </div>
  );
}
