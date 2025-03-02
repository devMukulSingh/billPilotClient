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
import React from 'react';
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
import { useSearchParams } from '@remix-run/react';


interface DataTableProps<TData, TValue> {
  className?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  totalPages?:number
  renderSubComponent: (props: { row: Row<TData> }) => React.ReactElement;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  renderSubComponent,
  totalPages
}: DataTableProps<TData, TValue>) {
  // console.log("rerender",data);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    getPaginationRowModel: getPaginationRowModel(),
    manualFiltering: true,
    manualPagination: true,
    initialState: {
      pagination: {
        pageIndex: 1, //custom initial page index
        pageSize: 10, //custom default page size
      },
    },
  });
  return (
    <div
      className={cn(
        className,
        `px-5 rounded-md flex flex-col  gap-5 `
      )}
    >
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
      {
        totalPages  &&
        <PaginationButtons totalPages={totalPages} table={table} />
      }
    </div>
  );
}

function PaginationButtons<TData>({
  table,
  totalPages,
}: {
  table: TTable<TData>;
  totalPages:number
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  return (
    <div className=" flex justify-center gap-5 mt-auto">
      <Button
        onClick={() => setSearchParams({ page: '1' })}
        disabled={page === 1}
      >
        {'<<'}
      </Button>
      <Button
        onClick={() => setSearchParams({ page: `${page - 1}` })}
        disabled={page === 1}
      >
        {'<'}
      </Button>
      <Button
        onClick={() => setSearchParams({ page: `${page + 1}` })}
        disabled={totalPages === page}
      >
        {'>'}
      </Button>
      <Button
        onClick={() => setSearchParams({ page: totalPages.toString() })}
        disabled={totalPages === page}
      >
        {'>>'}
      </Button>
    </div>
  );
}
