import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Menu, Package } from 'lucide-react';
import { DataTable } from '~/components/bills/DataTable';
import ItemsTable from '~/components/bills/ItemsTable';
import { Separator } from '~/components/ui/separator';
import { useState } from 'react';
import TableActionsDropdown from '~/components/bills/TableActionsDropdown';
import { BASE_URL_SERVER } from '~/lib/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/remix';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { TBill } from '~/lib/types/db.types';
import toast from 'react-hot-toast';

type Props = {};

export default function Bills({}: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { userId } = useAuth();
  const { data, isFetching,isPending } = useQuery<unknown, unknown, TBill[]>({
    queryKey: ['get_bills'],
    queryFn: async () => {
      return (
        await axios.get(`${BASE_URL_SERVER}/${userId}/bill/get-all-bills`)
      ).data;
    },
  });

  const columns: ColumnDef<TBill>[] = [
    {
      accessorKey: 'distributor.name',
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
          {row.original?.bill_items?.length}
          {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
        </button>
      ),
    },
    {
      accessorKey: 'is_paid',
      header: 'Paid',
      cell: ({ row }) => (row.getValue('is_paid') ? 'Yes' : 'No'),
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
            bill={row.original}
            isOpenDialog={isOpenDialog}
            setIsOpenDialog={setIsOpenDialog}
          >
            <Menu className="cursor-pointer" />
          </TableActionsDropdown>
        );
      },
    },
  ];

  return (
    <>
      <div
        className="
        flex-col
        gap-5
        flex
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
        {isFetching || isPending ? (
          <>loading...</>
        ) : (
          <DataTable
            columns={columns}
            data={data || []}
            renderSubComponent={ItemsTable}
          />
        )}
      </div>
    </>
  );
}
//  DataTableProps<TBill, unknown>.columns: ColumnDef<TBill, unknown>[]
