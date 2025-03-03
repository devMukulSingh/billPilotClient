import { useAuth } from '@clerk/remix';
import { useSearchParams } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { format } from 'date-fns';
import { PlusCircle, ShoppingBag } from 'lucide-react';
import { DataTable } from '~/components/commons/DataTable';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { BASE_URL_SERVER } from '~/lib/constants';
import { TApiResponse } from '~/lib/types/apiResponse.types';
import { TProduct } from '~/lib/types/db.types';

export default function ProductsRoute() {
  return (
    <div
      className="
      flex-col 
      border-red-600
      h-full
      w-full
      flex 
      gap-5
      px-5
      py-5
    "
    >
      <Header />
      <Separator className="border-white border" />
      <ProductsTable />
    </div>
  );
}

function Header() {
  return (
    <header
      className="
        flex 
        items-center
        justify-between
        gap-2 
      "
    >
      <div
        className="      
          items-center
          flex 
          gap-2 
          "
      >
        <ShoppingBag />
        <h1 className="text-2xl font-semibold">Manage Products</h1>
      </div>
      <Button variant={'outline'}>
        <PlusCircle />
        Add Product
      </Button>
    </header>
  );
}

function ProductsTable() {
  const { userId } = useAuth();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const limit = 10;
  const { data } = useQuery<any, any, TApiResponse<TProduct>>({
    queryKey: ['get_products'],
    queryFn: async () => {
      return (
        await axios.get(`${BASE_URL_SERVER}/${userId}/product/get-products`, {
          params: { page, limit },
        })
      ).data;
    },
  });
  const columns: ColumnDef<TProduct>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'rate',
      header: 'Rate',
      cell: ({ row }) => <>₹ {row.original.rate}</>,
    },
    {
      accessorKey: 'created_at',
      header: 'Date',
      cell: ({ row }) => <> {format(row.original.created_at, 'Pp')}</>,
    },
  ];
  return (
    <DataTable
      renderSubComponent={() => <></>}
      columns={columns}
      data={data?.data}
    />
  );
}
