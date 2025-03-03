import { useAuth } from '@clerk/remix';
import { useSearchParams } from '@remix-run/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit, Menu, Package, PlusCircle, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { DataTable } from '~/components/commons/DataTable';
import DeleteDialog from '~/components/bills/DeleteDialog';
import AddDomainDialog from '~/components/createBillForm/AddDomainDialog';
import TableActionsDropdown from '~/components/domain/TableActionsDropdown';
import DropdownModal from '~/components/modals/DopdownModal';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { BASE_URL_SERVER } from '~/lib/constants';
import { TApiResponse } from '~/lib/types/apiResponse.types';
import { TDomain } from '~/lib/types/db.types';
import { TDropdownOptions } from '~/lib/types/modals.types';

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
      <Separator className="border" />
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
  const page = searchParams.get('page') || '1';
  const limit = 10;
  const { userId } = useAuth();
  const { data, isFetching, isPending } = useQuery<TApiResponse<TDomain>>({
    queryKey: ['get_domains', page],
    queryFn: async () => {
      return (
        await axios.get(`${BASE_URL_SERVER}/${userId}/domain/get-domains`, {
          params: { page, limit },
        })
      ).data;
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
  return (
    <>
      {isFetching || isPending ? (
        <>loading...</>
      ) : (
        <DataTable
          className="min-h-[calc(100vh-7rem)]"
          renderSubComponent={() => <></>}
          data={data?.data}
          totalPages={totalPages}
          columns={columns}
        />
      )}
    </>
  );
}
