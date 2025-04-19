import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_SERVER } from 'lib/constants';

export const splitApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL_SERVER}`,
  }),
  tagTypes: [
    'get_bills',
    'get_all_bills',
    'get_searched_bills',
    'post_bill',
    'put_bill',
    'delete_bill',
    'get_distributors',
    'get_all_distributors',
    'get_searched_distributor',
    'post_distributor',
    'put_distributor',
    'delete_distributor',
    'get_domains',
    'get_all_domains',
    'get_searched_domains',
    'post_domain',
    'put_domain',
    'delete_domain',
    'get_products',
    'get_all_products',
    'get_searched_product',
    'post_product',
    'put_product',
    'delete_product',
  ],

  endpoints: () => ({}),
});
