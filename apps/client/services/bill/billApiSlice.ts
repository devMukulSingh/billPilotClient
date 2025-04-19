import { splitApi } from "redux/api";
import { TBill, TGetBillsArg, TCreateBillMutationArg, TBaseMutationArgs, TGetSearchedBillArg } from "types/api/bills";
import { TApiResponse } from "types/apiResponse.types";

export const billApiSlice = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getBills: build.query<TApiResponse<TBill[]>, TGetBillsArg>({
            query: (arg) => ({
                url: `/${arg.userId}/bill`,
                params: {
                    page: arg.page,
                    limit: arg.limit
                },
                method: "GET"
            }),
            providesTags: ['post_bill', 'delete_bill', 'put_bill'],
        }),
        getSearchedBill: build.query<TApiResponse<TBill[]>, TGetSearchedBillArg>({
            query : (arg) => ({
                url: `/${arg.userId}/bill/search`,
                params:{
                    page: arg.page,
                    limit: arg.limit,
                    startDate:arg.startDate,
                    endDate:arg.endDate
                },
                method:"GET"
            })
        }),
        createBill: build.mutation<{}, TCreateBillMutationArg>({
            query: (arg) => ({
                url: `/${arg.userId}/bill`,
                body: arg,
                method: "POST"
            }),
            invalidatesTags: ['post_bill']
        }),
        updateBill: build.mutation<{}, TCreateBillMutationArg & TBaseMutationArgs>({
            query: (arg) => ({
                url: `/${arg.userId}/bill/${arg.id}`,
                body: arg,
                method: "PUT"
            }),
            invalidatesTags: ['put_bill']
        }),
        deleteBill: build.mutation<{}, TBaseMutationArgs>({
            query: (arg) => ({
                url: `/${arg.userId}/bill/${arg.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['delete_bill']
        })
    }),
    overrideExisting: false,
})

export const {
    useLazyGetSearchedBillQuery,
    useGetBillsQuery, 
    useCreateBillMutation,
    useGetSearchedBillQuery, 
    useDeleteBillMutation, 
    useUpdateBillMutation
    
} = billApiSlice