import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL_SERVER } from "lib/constants"

const userId = typeof window !=="undefined" ? JSON.parse(localStorage.getItem('userId') || "{}") : ''


export const splitApi = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({
        credentials: 'include', // Include credentials (cookies) in requests
        baseUrl: `${BASE_URL_SERVER}/${userId}`,
    }),
    tagTypes:[
        'bill',
        'distributor',
        'domain',
        'product'
    ],

    endpoints: () => ({})
})

