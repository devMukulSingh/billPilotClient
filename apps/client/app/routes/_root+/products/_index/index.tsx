import { useAuth } from '@clerk/remix';
import { useSearchParams } from '@remix-run/react';
import { skipToken, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { format } from 'date-fns';
import { Menu, PlusCircle, ShoppingBag } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { DataTable } from '~/components/commons/DataTable';
import AddProductDialog from '~/components/product/AddProductDialog';
import AddProductForm from '~/components/product/AddProductDialog';
import TableActionsDropdown from '~/components/product/TableActionsDropdown';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { Skeleton } from '~/components/ui/skeleton';
import { BASE_URL_SERVER } from 'lib/constants';
import { TApiResponse } from 'types/apiResponse.types';
import SearchBar from '~/components/commons/SearchBar';
import { setProducts } from 'redux/reducers/rootReducer';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks/hook';
import { TProduct } from 'types/api/product';
import {
  useGetProductsQuery,
  useGetSearchedProductsQuery,
} from 'services/product/productAPiSlice';

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
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      {
        <AddProductDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      }
      <header
        className="
        flex 
        flex-col
        gap-5
      "
      >
        <div
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
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Manage Products
            </h1>
          </div>

          <Button onClick={() => setOpenDialog(true)} variant={'outline'}>
            <PlusCircle />
            Add Product
          </Button>
        </div>
      </header>
    </>
  );
}

function ProductsTable() {
  const { userId } = useAuth();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = Number(searchParams.get('page')) || 1;
  const limit = 10;
  const { isFetching, isLoading, data } = useGetProductsQuery({
    page,
    limit,
    userId,
  });
  const [tableData, setTableData] = useState(data);
  const {
    isFetching: isFetchingSearched,
    isLoading: isLoadingSearched,
    data: searchedProducts,
  } = useGetSearchedProductsQuery(
    {
      page,
      limit,
      userId,
      name: query,
    },
    {
      skip: query ? false : true,
    }
  );
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
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <TableActionsDropdown product={row.original}>
            <Menu className="cursor-pointer" />
          </TableActionsDropdown>
        );
      },
    },
  ];

  useEffect(() => {
    if (!query && data) setTableData(data);
    if (query && searchedProducts) setTableData(searchedProducts);
  }, [query, searchedProducts,data]);

  const totalPages = useMemo(() => Math.ceil((tableData?.count || 1) / limit),[tableData]) ;

  if (isFetching || isLoading) return <Skeleton className="w-full h-[25rem]" />;
  return (
    <>
      <DataTable
        className="min-h-[calc(100vh-11rem)]"
        renderSubComponent={() => <></>}
        columns={columns}
        data={tableData?.data}
        totalPages={totalPages}
      />
    </>
  );
}  
// useEffect(() => {
  //   if (data && !query) setTableData(data);
  // }, [data]);

// const { isFetching, isPending } = useQuery<any, any, TApiResponse<TProduct>>({
//   queryKey: ['get_products'],
//   queryFn: !query
//     ? async () => {
//         const { data } = await axios.get(
//           `${BASE_URL_SERVER}/${userId}/product/get-products`,
//           {
//             params: { page, limit },
//           }
//         );
//         dispatch(setProducts(data));
//         return data;
//       }
//     : skipToken,
// });
