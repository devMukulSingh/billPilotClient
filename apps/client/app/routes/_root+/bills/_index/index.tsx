import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Menu, Package } from 'lucide-react';
import { DataTable } from '~/components/commons/DataTable';
import ItemsTable from '~/components/bill/ItemsTable';
import { Separator } from '~/components/ui/separator';
import { useState } from 'react';
import TableActionsDropdown from '~/components/bill/TableActionsDropdown';
import { BASE_URL_SERVER } from 'lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/remix';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { TBill } from 'lib/types/db.types';
import { TApiResponse } from 'lib/types/apiResponse.types';
import { useSearchParams } from '@remix-run/react';
import { Skeleton } from '~/components/ui/skeleton';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks/hook';
import { setBills } from 'redux/reducers/rootReducer';

type Props = {};

export default function Bills({}: Props) {
  return (
    <>
      <div
        className="
        flex-col
        gap-5
        flex
        h-full border-2
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
            border-2
        "
          >
            <Package />
            All Bills
          </h1>
          <Separator className="border-white border" />
        </header>
        <BillsTable />
      </div>
    </>
  );
}

function BillsTable() {
  const response = useAppSelector((state) => state.rootReducer.bills);
  const dispatch = useDispatch();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const page = Number(searchParams.get('page')) || 1;
  const limit = 10;
  const { userId } = useAuth();

  const { data, isFetching, isPending } = useQuery<TApiResponse<TBill>>({
    queryKey: ['get_bills'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL_SERVER}/${userId}/bill/get-bills`,
        {
          params: { page, limit },
        }
      );

      dispatch(setBills(data));
      return data
    },
  });
  // const { data:searchedBills, refetch } = useQuery({
  //   queryKey: ['get_searched_bills',page,limit,startDate,endDate],
  // });

  const totalPages = Math.ceil((response?.count || 1) / limit);

  const columns: ColumnDef<TBill>[] = [
    {
      accessorKey: 'distributor.id',
      header: 'id',
    },
    {
      accessorKey: 'distributor.name',
      header: 'Distributor',
    },
    {
      accessorKey: 'domain.name',
      header: 'Domain',
    },
    {
      accessorKey: 'expander',
      header: 'Products',
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
      accessorKey: 'total_amount',
      header: 'Total amount',
      cell: ({ row }) => `₹${row.original.total_amount}`,
    },
    {
      accessorKey: 'is_paid',
      header: 'Paid',
      cell: ({ row }) => (row.getValue('is_paid') ? 'Yes' : 'No'),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => format(row.getValue('date'), 'dd-MM-yyyy | H:m'),
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

  if (isFetching || isPending) return <Skeleton className="w-full h-[25rem]" />;
  return (
    <DataTable
      className="min-h-[calc(100vh-12rem)]"
      columns={columns}
      data={response.data || []}
      totalPages={totalPages}
      renderSubComponent={ItemsTable}
    />
  );
}
