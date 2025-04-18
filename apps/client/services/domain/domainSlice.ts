import { BASE_URL_SERVER } from "lib/constants";
import { splitApi } from "redux/api";
import { TBaseMutationArgs, TBaseQueryArg, TBill } from "types/api/bills";
import { TDomain } from "types/api/domain";
import { TApiResponse } from "types/apiResponse.types";
import { TDomainFormValues } from "~/components/domain/AddDomainDialog";


const domainSlice = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getDomains: build.query<TApiResponse<TDomain[]>, TBaseQueryArg>({
            query: (arg) => ({
                url: `${arg.userId}/domain`,
                params: {
                    page: arg.page,
                    limit: arg.limit
                },
                method: "GET"
            }),
            providesTags:['put_domain','delete_domain','post_domain']
        }),
        getAllDomains: build.query<TApiResponse<TDomain[]>, { userId: string }>({
            query: (arg) => ({
                url: `${arg.userId}/domain/get-all-domains`,
                method: "GET"
            }),
            providesTags: ['put_domain', 'delete_domain', 'post_domain']
        }),
        getSearchedDomains: build.query<TApiResponse<TDomain[]>, TBaseQueryArg & {name:string | null}>({
            query: (arg) => ({
                url: `${arg.userId}/domain/search`,
                method: "GET",
                params: {
                    page: arg.page,
                    limit: arg.limit,
                    name:arg.name
                },
            })
        }),
        postDomain: build.mutation<{}, TDomainFormValues & {userId:string | null | undefined}>({
            query: (arg) => ({
                url: `${arg.userId}/domain`,
                method: "POST",
                body: arg
            }),
            invalidatesTags:['post_domain']
        }),
        putDomain: build.mutation<{}, TDomainFormValues & TBaseMutationArgs>({
            query: (arg) => ({
                url: `${arg.userId}/domain`,
                method: "PUT",
                body: arg
            }),
            invalidatesTags: ['put_domain']
        }),
        deleteDomain: build.mutation<{}, TBaseMutationArgs>({
            query: (arg) => ({
                url: `${arg.userId}/domain`,
                method: "DELETE",
                body: arg
            }),
            invalidatesTags: ['delete_domain']
        }),
    }),
})


export const {  useGetAllDomainsQuery,useGetSearchedDomainsQuery, useGetDomainsQuery,useDeleteDomainMutation,usePostDomainMutation,usePutDomainMutation} = domainSlice