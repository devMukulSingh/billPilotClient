import { useAuth } from '@clerk/remix';
import { useSearchParams } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit, Menu, Package, PlusCircle, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { DataTable } from '~/components/commons/DataTable';
import DeleteDialog from '~/components/bill/DeleteDialog';
import AddDomainDialog from '~/components/domain/AddDomainDialog';
import TableActionsDropdown from '~/components/domain/TableActionsDropdown';
import DropdownModal from '~/components/modals/DopdownModal';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { BASE_URL_SERVER } from 'lib/constants';
import { TApiResponse } from 'lib/types/apiResponse.types';
import { TDomain } from 'lib/types/db.types';
import { TDropdownOptions } from 'lib/types/modals.types';
import { Skeleton } from '~/components/ui/skeleton';
import { useAppSelector } from 'redux/hooks/hook';
import { setDomains } from 'redux/reducers/rootReducer';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const domains = useAppSelector((state) => state.rootReducer.domains);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page') || '1';
  const limit = 10;
  const { userId } = useAuth();
  // const { isFetching:isFetchingSearchedDomains } = useQuery({ queryKey: [`get_searched_domains/${query}`] });
  const { data, isFetching, isPending } = useQuery<TApiResponse<TDomain>>({
    queryKey: ['get_domains', page],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL_SERVER}/${userId}/domain/get-domains`,
        {
          params: { page, limit },
        }
      );
      dispatch(setDomains(data));
      return data;
    },
  });

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
  const totalPages = Math.ceil((data?.count || 1) / limit);
  if (isFetching || isPending)
    return <Skeleton className="w-full h-[25rem]" />;
  return (
    <>
      <DataTable
        className="min-h-[calc(100vh-7rem)]"
        renderSubComponent={() => <></>}
        data={domains?.data}
        totalPages={totalPages}
        columns={columns}
      />
    </>
  );
}
