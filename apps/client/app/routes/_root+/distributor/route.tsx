import { useAuth } from '@clerk/remix';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit, Menu, Package, PlusCircle, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { DataTable } from '~/components/bills/DataTable';
import DeleteDialog from '~/components/bills/DeleteDialog';
import AddDistributorDialog from '~/components/createBillForm/AddDistributorDialog';
import TableActionsDropdown from '~/components/distributor/TableActionsDropdown';

import DropdownModal from '~/components/modals/DopdownModal';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { BASE_URL_SERVER } from '~/lib/constants';
import { TDistributor } from '~/lib/types/db.types';
import { TDropdownOptions } from '~/lib/types/modals.types';

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
      <Separator className="border" />
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
      flex 
      items-center 
      w-full 
      justify-between
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
            Manage distributors
          </h1>
        </div>
        <Button variant={'outline'} onClick={() => setIsOpendistributorDialog(true)}>
          <PlusCircle />
          Add distributor
        </Button>
      </header>
    </>
  );
}

function Distributor() {
  const { userId } = useAuth();
  const { data, isFetching } = useQuery<unknown, unknown, TDistributor[]>({
    queryKey: ['get_distributors'],
    queryFn: async () => {
      return (
        await axios.get(
          `${BASE_URL_SERVER}/${userId}/distributor/get-all-distributors`
        )
      ).data;
    },
  });

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

  return (
    <>
      {isFetching ? (
        <>loading...</>
      ) : (
        <DataTable
          className="min-h-[calc(100vh-7rem)]"
          renderSubComponent={() => <></>}
          data={data}
          columns={columns}
        />
      )}
    </>
  );
}
