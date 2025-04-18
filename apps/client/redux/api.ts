import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL_SERVER } from "lib/constants"



export const splitApi = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL_SERVER}`,
    }),
    tagTypes:[
        'bill',
        'distributor',
        'domain',
        'product'
    ],

    endpoints: () => ({})
})

