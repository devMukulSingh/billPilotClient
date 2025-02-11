import { ColumnDef, Row } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Menu,
  Package,
  Trash,
} from 'lucide-react';
import { DataTable } from '~/components/bills/DataTable';
import ItemsTable from '~/components/bills/ItemsTable';
import { Separator } from '~/components/ui/separator';
import { useState } from 'react';
import DeleteDialog from '~/components/bills/DeleteDialog';
import { TBill } from '~/lib/types/routes.types';
import TableActionsDropdown from '~/components/bills/TableActionsDropdown';
import { Bills as bills } from '~/lib/constants';

type Props = {};

export default function Bills({}: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const columns: ColumnDef<TBill>[] = [
    {
      accessorKey: 'distributorName',
      header: 'Distributor',
    },
    {
      accessorKey: 'expander',
      header: 'Items',
      cell: ({ row }) => (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            className: 'flex gap-3',
          }}
        >
          {row.original.items.length}
          {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
        </button>
      ),
    },
    {
      accessorKey: 'isPaid',
      header: 'Paid',
      cell: ({ row }) => (row.getValue('isPaid') ? 'Yes' : 'No'),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => format(row.getValue('date'), 'Pp'),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        return (
          <TableActionsDropdown
            billId={row.original.id}
            onOpenDialog={() => setIsOpenDialog(true)}
          >
            <Menu className="cursor-pointer" />
          </TableActionsDropdown>
        );
      },
    },
  ];

  function onDelete() {}
  return (
    <>
      {isOpenDialog && (
        <DeleteDialog
          onDelete={onDelete}
          description="This action can't be undone"
          open={isOpenDialog}
          onClose={() => setIsOpenDialog(false)}
          title="Are you sure?"
        />
      )}
      <div
        className="
    flex
    flex-col
    gap-5
    "
      >
        <header className="space-y-2 p-5">
          <h1
            className="
        sm:text-3xl 
        text-2xl 
        font-medium
        text-neutral-800
        flex
        items-center
        gap-2
        "
          >
            <Package />
            All Bills
          </h1>
          <Separator className="bg-white" />
        </header>
        <DataTable
          columns={columns}
          data={bills}
          renderSubComponent={ItemsTable}
        />
      </div>
    </>
  );
}
