import { splitApi } from 'redux/api';
import { TBaseQueryArg } from 'types/api/bills';
import { TPostProductArg, TProduct } from 'types/api/product';
import { TApiResponse } from 'types/apiResponse.types';

const productApiSlice = splitApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<TApiResponse<TProduct[]>, TBaseQueryArg>({
      query: (arg) => ({
        url: `/${arg.userId}/product`,
        params: {
          page: arg.page,
          limit: arg.limit,
        },
        method: 'GET',
      }),
      providesTags: ['put_product', 'delete_product', 'post_product'],
    }),
    getAllProducts: build.query<
      TProduct[],
      { userId: string | null | undefined }
    >({
      query: (arg) => ({
        url: `/${arg.userId}/product/get-all-products`,
        method: 'GET',
      }),
      providesTags: ['put_product', 'delete_product', 'post_product'],
    }),
    getSearchedProducts: build.query<
      TApiResponse<TProduct[]>,
      TBaseQueryArg & { name: string | null }
    >({
      query: (arg) => ({
        url: `/${arg.userId}/product/search`,
        method: 'GET',
        params: {
          page: arg.page,
          limit: arg.limit,
          name: arg.name,
        },
      }),
      providesTags: ['put_product', 'delete_product', 'post_product'],
    }),
    postProduct: build.mutation<{}, TPostProductArg>({
      query: (arg) => ({
        url: `/${arg.userId}/product`,
        method: 'POST',
        body: {
          name: arg.name,
          rate: arg.rate,
        },
      }),
      invalidatesTags: ['post_product'],
    }),
    putProduct: build.mutation<{}, TPostProductArg & { id: string | null }>({
      query: (arg) => ({
        url: `/${arg.userId}/product/${arg.id}`,
        method: 'PUT',
        body: arg,
      }),
      invalidatesTags: ['put_product'],
    }),
    deleteProduct: build.mutation<
      {},
      { id: string | null; userId: string | null | undefined }
    >({
      query: (arg) => ({
        url: `/${arg.userId}/product/${arg.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['delete_product'],
    }),
  }),
});

export const {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetProductsQuery,
  useGetSearchedProductsQuery,
  usePostProductMutation,
  usePutProductMutation,
} = productApiSlice;
