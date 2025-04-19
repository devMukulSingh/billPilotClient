import { Outlet } from '@remix-run/react';
import { Search, X } from 'lucide-react';
import { useAuth } from '@clerk/remix';
import axios from 'axios';
import { useSearchParams } from '@remix-run/react';
import {
  billApiSlice,
  useGetBillsQuery,
  useGetSearchedBillQuery,
  useLazyGetSearchedBillQuery,
} from 'services/bill/billApiSlice';
import { TBill } from 'types/api/bills';
import { useEffect, useState } from 'react';
import { DateRangePicker } from '~/components/bill/DateRangePicker';
import { Button } from '~/components/ui/button';
import { setBills } from 'redux/reducers/rootReducer';
import { useDispatch } from 'react-redux';

export default function BillLayout() {
  return (
    <div className=" bg-slate-200">
      <BillsHeader />
      <Outlet />
    </div>
  );
}

function BillsHeader() {
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const limit = 10;
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const { data } = useGetBillsQuery({
    limit,
    page,
    userId,
  });
  const [
    trigger,
    {
      isFetching: isFetchingSearch,
      isLoading: isLoadingSearch,
      data: searchedBills,
    },
  ] = useLazyGetSearchedBillQuery();

  async function handleClearSearch() {
    if (!searchParams.get(`endDate`) && !searchParams.get(`startDate`)) return;
    setSearchParams((prev) => {
      prev.delete(`startDate`);
      prev.delete(`endDate`);
      return prev;
    });
    if (data) dispatch(setBills(data));
  }

  function handleSearch() {
    trigger({
      endDate,
      startDate,
      page,
      limit,
      userId,
    });
  }
  useEffect(() => {
    if (!searchedBills || !startDate || !endDate) return;
    dispatch(setBills(searchedBills));
  }, [searchedBills]);
  return (
    <div
      className="
      flex
      items-center 
      h-16
      px-5 
      bg-slate-300
      gap-5
     "
    >
      <div
        className="
        items-center
        border 
        bg-white
        rounded-lg
        sticky
        top-0
        flex 
        justify-between
      "
      >
        <DateRangePicker />
        <Button
          disabled={isLoadingSearch || isFetchingSearch}
          onClick={handleSearch}
          variant={'ghost'}
        >
          <Search />
          Search
        </Button>
      </div>
      <Button
        disabled={
          isLoadingSearch || isFetchingSearch || (!startDate && !endDate)
        }
        onClick={handleClearSearch}
      >
        Clear Search
      </Button>
    </div>
  );
}

// const { isPending, refetch } = useQuery<TApiResponse<TBill>>({
//   queryKey: ['get_searched_bills'],
//   enabled: false,
//   queryFn: async () => {
//     const { data } = await axios.get(`${BASE_URL_SERVER}/${userId}/bill`, {
//       params: {
//         page,
//         limit,
//         startDate,
//         endDate,
//       },
//     });
//     dispatch(setBills(data));
//     return data;
//   },
// });
