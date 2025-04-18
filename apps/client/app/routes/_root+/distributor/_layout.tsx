import { useAuth } from '@clerk/remix';
import { Outlet, useSearchParams } from '@remix-run/react';
import { skipToken, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from 'lib/constants';
import { TApiResponse } from 'types/apiResponse.types';
import toast from 'react-hot-toast';
import { setDistributors } from 'redux/reducers/rootReducer';
import SearchBar from '~/components/commons/SearchBar';
import { useDispatch } from 'react-redux';
import { TDistributor } from 'types/api/distributor';
import {
  useGetAllDistributorsQuery,
  useGetSearchedDistributorsQuery,
} from 'services/distributor/distributorApiSlice';

export default function DistributorLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = Number(searchParams.get('page')) || 1;
  const limit = 10;
  const { userId } = useAuth();
  const { data } = useGetSearchedDistributorsQuery(
    {
      name: query,
      page,
      limit,
      userId,
    },
    { skip: query ? false : true }
  );

  const { data: allDistributors } = useGetAllDistributorsQuery({
    userId,
  });

  async function handleClearSearch() {
    if (!searchParams.get(`query`)) return;
    if (!allDistributors) return toast.error(`Distributors are undefined`);
    setSearchParams((prev) => {
      prev.delete(`query`);
      return prev;
    });
  }
  return (
    <>
      <SearchBar handleClearSearch={handleClearSearch} />
      <Outlet />
    </>
  );
}

// useQuery<unknown, unknown, TApiResponse<TDistributor>>({
//   queryKey: [`get_searched_distributors/${query}`],
//   queryFn: query
//     ? async () => {
//         const { data } = await axios.get(
//           `${BASE_URL_SERVER}/${userId}/distributor`,
//           {
//             params: { name: query, page, limit },
//           }
//         );
//         dispatch(setDistributors(data));
//         return data;
//       }
//     : skipToken,
// });

// const { data: allDistributors } = useQuery<
//   unknown,
//   unknown,
//   TApiResponse<TDistributor>
// >({
//   queryKey: ['get_distributors'],
//   queryFn: async () => {
//     const cache = queryClient.getQueryData(['get_distributors']);
//     if (cache) return cache;
//     const { data } = await axios.get(
//       `${BASE_URL_SERVER}/${userId}/distributor/get-distributors`,
//       {
//         params: { page, limit },
//       }
//     );
//     return data;
//   },
// });
