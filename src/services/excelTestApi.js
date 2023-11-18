import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants/endpoints';

export const excelTestApi = createApi({
    reducerPath: 'excelTestApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Orders'],
    endpoints: (build) => ({
        //gets
        getOrders: build.query({
            query: (getOrdersRequest) => ({
                url: 'getOrders',
                method: 'POST',
                body: getOrdersRequest,
            }),
            providesTags: (result) => (result ? [{ type: 'Orders', id: 'all' }] : []),
        }),
        getCountries: build.query({
            query: () => ({
                url: 'getCountries',
                method: 'POST',
                body: {},
            }),
            providesTags: (result) => (result ? [{ type: 'Countries', id: 'all' }] : []),
        }),
        //mutations
        postOrders: build.mutation({
            query: (postOrdersRequest) => ({
                url: 'postOrders',
                method: 'POST',
                body: postOrdersRequest,
            }),
            invalidatesTags: [{ type: 'Orders', id: 'all' }],
        }),
        putOrder: build.mutation({
            query: (putOrderRequest) => ({
                url: 'putOrder',
                method: 'PUT',
                body: putOrderRequest,
            }),
            invalidatesTags: [{ type: 'Orders', id: 'all' }],
        }),
        removeOrder: build.mutation({
            query: (removeOrderRequest) => ({
                url: 'removeOrder',
                method: 'DELETE',
                body: removeOrderRequest,
            }),
            invalidatesTags: [{ type: 'Orders', id: 'all' }],
        }),
    }),
});

export const { useLazyGetOrdersQuery, useLazyGetCountriesQuery, usePostOrdersMutation, usePutOrderMutation, useRemoveOrderMutation } = excelTestApi;