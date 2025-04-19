import { splitApi } from 'redux/api';
import { TBaseMutationArgs, TBaseQueryArg } from 'types/api/bills';
import { TDistributor, TPostDistributorArg } from 'types/api/distributor';
import { TApiResponse } from 'types/apiResponse.types';

const distributorApiSlice = splitApi.injectEndpoints({
  endpoints: (build) => ({
    getDistributors: build.query<TApiResponse<TDistributor[]>, TBaseQueryArg>({
      query: (arg) => ({
        url: `/${arg.userId}/distributor`,
        params: {
          page: arg.page,
          limit: arg.limit,
        },
        method: 'GET',
      }),
      providesTags: [
        'delete_distributor',
        'put_distributor',
        'post_distributor',
      ],
    }),
    getAllDistributors: build.query<
      TDistributor[],
      { userId: string | null | undefined }
    >({
      query: (arg) => ({
        url: `/${arg.userId}/distributor/get-all-distributors`,
        method: 'GET',
      }),
      providesTags: [
        'delete_distributor',
        'put_distributor',
        'post_distributor',
      ],
    }),
    getSearchedDistributors: build.query<
      TApiResponse<TDistributor[]>,
      TBaseQueryArg & { name: string | null }
    >({
      query: (arg) => ({
        url: `/${arg.userId}/distributor/search`,
        method: 'GET',
        params: {
          page: arg.page,
          limit: arg.limit,
          name: arg.name,
        },
      }),
    }),
    postDistributor: build.mutation<{}, TPostDistributorArg>({
      query: (arg) => ({
        url: `/${arg.userId}/distributor`,
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['post_distributor'],
    }),
    putDistributor: build.mutation<
      {},
      TPostDistributorArg & { id: string | null }
    >({
      query: (arg) => ({
        url: `/${arg.userId}/distributor/${arg.id}`,
        method: 'PUT',
        body: arg,
      }),
      invalidatesTags: ['put_distributor'],
    }),
    deleteDistributor: build.mutation<{}, TBaseMutationArgs>({
      query: (arg) => ({
        url: `/${arg.userId}/distributor/${arg.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['delete_distributor'],
    }),
  }),
});

export const {
  useDeleteDistributorMutation,
  useGetAllDistributorsQuery,
  useGetDistributorsQuery,
  useGetSearchedDistributorsQuery,
  usePostDistributorMutation,
  usePutDistributorMutation,
} = distributorApiSlice;
