
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const rootAdminDonationsApi = createApi({
    reducerPath: 'AdminDonations',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.BACKEND_BASE_ROUTE}/adminDonations`,

    }),
    tagTypes: ['AdminDonations', 'AllAdminsDonations'],

    // Endpoints are defined in seperate files and injected 
    // to this Reducer to reduce code-complexity and enhance organization!!
    endpoints: (builder) => ({
        // The Root Slice shall hold the CRUD Operaations!
        // Different views shall be held in injected Endpoints from extended slices
        // ! Need to figure out where each of these is located!
        donateToCampaign: builder.mutation({
            query: (id) => ({
                url: `/donate/${id}`,
                method: 'POST'
            }),
            invalidatesTags: ['AdminDonations', 'AllAdminDonations']
        }),


        // updateDonation: builder.mutation({
        //     query: (id) => ({
        //         url: `/don/${id}`,
        //         method: 'PUT',
        //     })
        // invalidatesTags: (id) => ['AdminDonations', 'AllAdminDonations', { type: 'AdminDonations', id: id }]
        // }), // No backend route for this exists yet, however this is managable!

        // deleteDonation: builder.mutation({
        //     query: (id) => ({
        //         url: `/don/${id}`,
        //         method: 'DELETE'
        //     }),
        //     invalidatesTags: (id) => ['AdminDonations', 'AllAdminDonations', { type: 'AdminDonations', id: id }]
        // }), // No backend route for this exists yet, however this is managable!


        getDonation: builder.query({
            query: (id) => `/don/${id}`,
            providesTags: (id) => [{ type: 'AdminDonations', id: id }]
        }), // 
    })
})

