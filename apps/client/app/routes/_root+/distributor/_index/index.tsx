import { useAuth } from '@clerk/remix';
import { useSearchParams } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit, Menu, Package, PlusCircle, Trash } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from '~/components/commons/DataTable';
import AddDistributorDialog from '~/components/distributor/AddDistributorDialog';
import TableActionsDropdown from '~/components/distributor/TableActionsDropdown';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { Skeleton } from '~/components/ui/skeleton';
import { BASE_URL_SERVER } from 'lib/constants';
import { TApiResponse } from 'types/apiResponse.types';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks/hook';
import { TDistributor } from 'types/api/distributor';
import {
  useGetDistributorsQuery,
  useGetSearchedDistributorsQuery,
} from 'services/distributor/distributorApiSlice';

type Props = {};

export default function DistributorRoute({}: Props) {
  return (
    <div
      className="
      flex-col
      h-full
      w-full
      px-10
      py-5
      flex
      gap-5
    "
    >
      <Header />
      <Separator className="border-white border" />
      <Distributor />
    </div>
  );
}

function Header() {
  const [isOpendistributorDialog, setIsOpendistributorDialog] = useState(false);
  return (
    <>
      {isOpendistributorDialog && (
        <AddDistributorDialog
          openDialog={isOpendistributorDialog}
          setOpenDialog={setIsOpendistributorDialog}
        />
      )}
      <header
        className="
        w-full 
        justify-between
        flex 
        items-center 
      "
      >
        <div className="flex gap-2 items-center ">
          <Package size={30} />
          <h1
            className="
            font-semibold 
            underline-offset-1
            text-2xl
            sm:text-3xl 
      "
          >
            Manage Distributors
          </h1>
        </div>
        <Button
          variant={'outline'}
          onClick={() => setIsOpendistributorDialog(true)}
        >
          <PlusCircle />
          Add distributor
        </Button>
      </header>
    </>
  );
}

function Distributor() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query');
  const limit = 10;
  const { userId } = useAuth();
  const { data, isFetching, isLoading } = useGetDistributorsQuery({
    limit,
    page,
    userId,
  });
  const [tableData, setTableData] = useState(data);
  const { data: searchedDistributors } = useGetSearchedDistributorsQuery(
    {
      name: query,
      page,
      limit,
      userId,
    },
    { skip: query ? false : true }
  );

  const columns: ColumnDef<TDistributor>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'created_at',
      header: 'Date created',
      cell: ({ row }) => <>{format(row.original.created_at, 'Pp')} </>,
    },
    {
      accessorKey: 'domain.name',
      header: 'Domain',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <TableActionsDropdown distributor={row.original}>
            <Menu className="cursor-pointer" />
          </TableActionsDropdown>
        );
      },
    },
  ];
  const totalPages = useMemo(
    () => Math.ceil((tableData?.count || 1) / limit),
    [tableData]
  );
  useEffect(() => {
    if (!query && data) setTableData(data);
    if (query && searchedDistributors) setTableData(searchedDistributors);
  }, [query, searchedDistributors, data]);
  if (isFetching || isLoading) return <Skeleton className="w-full h-[25rem]" />;
  return (
    <>
      <DataTable
        className="min-h-[calc(100vh-7rem)]"
        totalPages={totalPages}
        renderSubComponent={() => <></>}
        data={tableData?.data}
        columns={columns}
      />
    </>
  );
}

// const { isFetching, isPending } = useQuery<TApiResponse<TDistributor>>({
//   queryKey: ['get_distributors', page],
//   queryFn: async () => {
//     const { data } = await axios.get(
//       `${BASE_URL_SERVER}/${userId}/distributor/get-distributors`,
//       {
//         params: { page, limit },
//       }
//     );
//     dispatch(setDistributors(data));
//     return data;
//   },
// });
