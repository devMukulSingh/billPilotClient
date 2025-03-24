import { Search, X } from 'lucide-react';
import { DateRangePicker } from './DateRangePicker';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL_SERVER } from 'lib/constants';
import { useAuth } from '@clerk/remix';
import axios from 'axios';
import { useSearchParams } from '@remix-run/react';
import { TApiResponse } from 'lib/types/apiResponse.types';
import { TBill } from 'lib/types/db.types';
import { setBills } from 'redux/reducers/rootReducer';
import { useDispatch } from 'react-redux';

type Props = {};

export default function Header({}: Props) {
  const dispatch = useDispatch()
  const { userId } = useAuth();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = 10;
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const {  isFetching, isPending, refetch } = useQuery<TApiResponse<TBill>>({
    queryKey: ['get_searched_bills'],
    enabled: false,
    queryFn: async () => {
      const {data} = await axios.get(`${BASE_URL_SERVER}/${userId}/bill`, {
        params: {
          page,
          limit,
          startDate,
          endDate,
        },
      });
      dispatch(setBills(data))
      return data
    },
  });
  function handleSearch() {
    refetch();
  }
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
        <Button disabled={isFetching} onClick={handleSearch} variant={'ghost'}>
          <Search />
          Search
        </Button>
      </div>
        <Button disabled={isFetching} onClick={handleSearch} >
          Clear Search
        </Button>
    </div>
  );
}
