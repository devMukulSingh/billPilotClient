import { useAuth } from '@clerk/remix';
import { Outlet, useSearchParams } from '@remix-run/react';
import SearchBar from '~/components/commons/SearchBar';

export default function DistributorLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = Number(searchParams.get('page')) || 1;
  const limit = 10;
  const { userId } = useAuth();

  return (
    <>
      <SearchBar />
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
