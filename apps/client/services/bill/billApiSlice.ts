import { splitApi } from "redux/api";
import { TBill, TGetBillsArg, TCreateBillMutationArg, TBaseMutationArgs } from "types/api/bills";
import { TApiResponse } from "types/apiResponse.types";

const billApiSlice = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getBills: build.query<TApiResponse<TBill[]>, TGetBillsArg>({
            query: (arg) => ({
                url: `/${arg.userId}/bill/get-bills`,
                params: {
                    page: arg.page,
                    limit: arg.limit
                },
                method: "GET"
            }),
            providesTags: ['bill'],
        }),
        createBill: build.mutation<{}, TCreateBillMutationArg>({
            query: (arg) => ({
                url: `/${arg.userId}/bill`,
                body: arg,
                method: "POST"
            }),
        }),
        updateBill: build.mutation<{}, TCreateBillMutationArg & TBaseMutationArgs>({
            query: (arg) => ({
                url: `/${arg.userId}/bill/${arg.id}`,
                body: arg,
                method: "PUT"
            })
        }),
        deleteBill: build.mutation<{}, TBaseMutationArgs >({
            query: (arg) => ({
                url: `/${arg.userId}/bill/${arg.id}`,
                method: "DELETE"
            })
        })
    }),
    overrideExisting: false,

})

export const {
    useGetBillsQuery, useCreateBillMutation, useDeleteBillMutation, useUpdateBillMutation
} = billApiSlice