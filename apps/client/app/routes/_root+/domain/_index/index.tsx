import { useAuth } from '@clerk/remix';
import { useSearchParams } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit, Menu, Package, PlusCircle, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DataTable } from '~/components/commons/DataTable';
import DeleteDialog from '~/components/bill/DeleteDialog';
import AddDomainDialog from '~/components/domain/AddDomainDialog';
import TableActionsDropdown from '~/components/domain/TableActionsDropdown';
import DropdownModal from '~/components/modals/DopdownModal';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { BASE_URL_SERVER } from 'lib/constants';
import { TApiResponse } from 'types/apiResponse.types';
import { TDropdownOptions } from 'types/modals.types';
import { Skeleton } from '~/components/ui/skeleton';
import { useAppSelector } from 'redux/hooks/hook';
import { useDispatch } from 'react-redux';
import { TDomain } from 'types/api/domain';
import {
  useGetDomainsQuery,
  useGetSearchedDomainsQuery,
} from 'services/domain/domainSlice';

type Props = {};

export default function DomainRoute({}: Props) {
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
      <Domains />
    </div>
  );
}

function Header() {
  const [isOpenDomainDialog, setIsOpenDomainDialog] = useState(false);
  return (
    <>
      {isOpenDomainDialog && (
        <AddDomainDialog
          openDialog={isOpenDomainDialog}
          setOpenDialog={setIsOpenDomainDialog}
        />
      )}
      <header
        className="
        justify-between
        flex 
        items-center 
        w-full 
      "
      >
        <div className="flex gap-2 items-center ">
          <Package size={30} />
          <h1
            className="
            sm:text-3xl 
            font-semibold 
            underline-offset-1
            text-2xl
      "
          >
            Manage Domains
          </h1>
        </div>
        <Button variant={'outline'} onClick={() => setIsOpenDomainDialog(true)}>
          <PlusCircle />
          Add Domain
        </Button>
      </header>
    </>
  );
}

function Domains() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = Number(searchParams.get('page')) || 1;
  const limit = 10;
  const { userId } = useAuth();
  const { data, isFetching, isLoading } = useGetDomainsQuery({
    limit,
    page,
    userId,
  });
  const { data: searchedDomains, isFetching: isFetchingSearchedDomains } =
    useGetSearchedDomainsQuery(
      {
        name: query,
        page,
        limit,
        userId,
      },
      { skip: query ? false : true }
    );
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    if (!query && data) setTableData(data);
    if (query && searchedDomains) setTableData(searchedDomains);
  }, [query, searchedDomains, data]);
  const columns: ColumnDef<TDomain>[] = [
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
      id: 'actions',
      cell: ({ row }) => {
        return (
          <TableActionsDropdown domain={row.original}>
            <Menu className="cursor-pointer" />
          </TableActionsDropdown>
        );
      },
    },
  ];
  const totalPages = Math.ceil((tableData?.count || 1) / limit);
  if (isFetching || isLoading) return <Skeleton className="w-full h-[25rem]" />;
  return (
    <>
      <DataTable
        className="min-h-[calc(100vh-7rem)]"
        renderSubComponent={() => <></>}
        data={tableData?.data}
        totalPages={totalPages}
        columns={columns}
      />
    </>
  );
}

// const { isFetching:isFetchingSearchedDomains } = useQuery({ queryKey: [`get_searched_domains/${query}`] });
// const { data, isFetching, isLoading } = useQuery<TApiResponse<TDomain>>({
//   queryKey: ['get_domains', page],
//   queryFn: async () => {
//     const { data } = await axios.get(
//       `${BASE_URL_SERVER}/${userId}/domain/get-domains`,
//       {
//         params: { page, limit },
//       }
//     );
//     dispatch(setDomains(data));
//     return data;
//   },
// });
