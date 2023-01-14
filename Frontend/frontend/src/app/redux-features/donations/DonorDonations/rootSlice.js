
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const rootDonorDonationsApi = createApi({
    reducerPath: 'DonorDonations',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BACKEND_BASE_ROUTE}/adminDonations` }),
    tagTypes: ['DonorDonations', 'AllDonorsDonations'],

    // Endpoints are defined in seperate files and injected 
    // to this Reducer to reduce code-complexity and enhance organization!!
    endpoints: (builder) => ({
        donate: builder.mutation({
            query: () => ({
                url: `/donate`, // ! need to look into this
                method: 'POST'
            }),
            invalidatesTags: ['DonorDonations', 'AllDonorsDonations']
        }),

        // updateDonation: builder.mutation({
        //     query: (id) => ({
        //         url: `/don/${id}`,
        //         method: 'PUT',
        //     })
        // invalidatesTags: (id) => ['DonorDonations', 'AllDonorsDonations', { type: 'DonorDonations', id: id }]
        // }), // No backend route for this exists yet, however this is managable!

        // deleteDonation: builder.mutation({
        //     query: (id) => ({
        //         url: `/don/${id}`,
        //         method: 'DELETE'
        //     }),
        //     invalidatesTags: (id) => ['DonorDonations', 'AllDonorsDonations', { type: 'DonorDonations', id: id }]
        // }), // No backend route for this exists yet, however this is managable!
        getDonation: builder.query({
            query: (id) => `/don/${id}`,
            providesTags: (id) => [{ type: 'DonorDonations', id: id }]
        }),

    })
})
