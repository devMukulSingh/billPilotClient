import { useAuth } from '@clerk/remix';
import { Outlet, useSearchParams } from '@remix-run/react';
import { skipToken, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from 'lib/constants';
import { TApiResponse } from 'types/apiResponse.types';
import { TProduct } from 'types/db.types';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setProducts } from 'redux/reducers/rootReducer';
import SearchBar from '~/components/commons/SearchBar';

export default function ProductLayout() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page') || 1;
  const limit = 10;
  const { userId } = useAuth();
  useQuery<unknown, unknown, TApiResponse<TProduct>>({
    queryKey: [`get_searched_products/${query}`],
    queryFn: query
      ? async () => {
          const { data } = await axios.get(
            `${BASE_URL_SERVER}/${userId}/product`,
            {
              params: { name: query, page, limit },
            }
          );
          dispatch(setProducts(data));
          return data;
        }
      : skipToken,
  });
  const { data: allProducts } = useQuery<
    unknown,
    unknown,
    TApiResponse<TProduct>
  >({
    queryKey: ['get_products'],
    queryFn: async () => {
      const cache = queryClient.getQueryData(['get_products']);
      if (cache) return cache;
      const { data } = await axios.get(
        `${BASE_URL_SERVER}/${userId}/product/get-products`,
        {
          params: { page, limit },
        }
      );
      return data;
    },
  });

  async function handleClearSearch() {
    if (!searchParams.get(`query`)) return;
    if (!allProducts) return toast.error(`Products are undefined`);
    dispatch(setProducts(allProducts));
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
