
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const donorApi = createApi({
    reducerPath: 'Donor',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BACKEND_BASE_ROUTE}/donor` }),
    tagTypes: ['Donor', 'Donors'],

    endpoints: (builder) => ({

        // 👨‍👨‍👦 Fetch all Admins 📷
        allDonors: builder.query({
            query: () => `/`,
            providesTags: [{ type: 'Donors' }]
        }),

        // 👨‍👨‍👦 Fetch a particular Admin based on ones id 📷
        getDonor: builder.query({
            query: (id) => `${id}`,
            providesTags: [{ type: 'Donor', id: id }]
        }),

        // 👨‍👨‍👦 Create a new Admin in the database!!📷
        createDonor: builder.mutation({
            query: donor_data => ({
                url: '/',
                body: donor_data,
                method: 'POST'
            }),
            invalidatesTags: ['Donors']
        }),

        updateAdmin: builder.mutation({
            query: (id, admin_data) => ({
                url: `${id}`,
                body: admin_data,
                method: 'PUT'
            }),
            invalidatesTags: ['Donors', { type: 'Donor', id: id }]
        }),

        deleteAdmin: builder.mutation({
            query: id => ({
                url: `${id}`,
                body: id,
                method: 'DELETE'
            }),
            invalidatesTags: ['Donors', { type: 'Donor', id: id }]
        }),


        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints

    })
})


export const {
    useGetDonorQuery,
    useAllDonorsQuery,
    useCreateDonorMutation,
    useUpdateAdminMutation,
    useDeleteAdminMutation
} = donorApi