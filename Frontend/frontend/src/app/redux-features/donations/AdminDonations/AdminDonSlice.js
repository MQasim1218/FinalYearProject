
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const adminApi = createApi({
    reducerPath: 'AdminDonations',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.BACKEND_BASE_ROUTE}/adminDonations`
    }),
    tagTypes: ['AdminDonations', 'AllAdminDonations'],

    endpoints: (builder) => ({

        /**
         * ! Map each endpoint to a backend route!!
         */

        // 👨‍👨‍👦 Fetch all Admins' Donations 📷
        allAdminDonations: builder.query({
            query: (category) => ({
                url: category == null ? `` : `${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllAdminDonations' }]
        }),

        allAdminYearDonations: builder.query({
            query: (year, category) => ({
                url: category == null ? `${year}` : `${year}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllAdminDonations' }]
        }),

        allAdminMonthDonations: builder.query({
            query: (year, month, category) => ({
                url: category == null ? `${year}/${month}` : `${year}/${month}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllAdminDonations' }]
        }),


        // 👨‍👨‍👦 Fetch all Admins' Donations 📷
        allAdminDonations: builder.query({
            query: (category) => ({
                url: category == null ? `` : `${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllAdminDonations' }]
        }),

        allAdminYearDonations: builder.query({
            query: (year, category) => ({
                url: category == null ? `${year}` : `${year}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllAdminDonations' }]
        }),

        allAdminMonthDonations: builder.query({
            query: (year, month, category) => ({
                url: category == null ? `${year}/${month}` : `${year}/${month}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllAdminDonations' }]
        }),

        // 👨‍👨‍👦 Create a new Admin in the database!!📷
        createAdmin: builder.mutation({
            query: donation_data => ({
                url: '/',
                body: donation_data,
                method: 'POST'
            }),
            invalidatesTags: ['Admins', { type: 'Admin', id: id }]
        }),

        // ! Do we need Update and delete functionality for donations?
        // ! Since its manual data entry, thus allowing for updates and deletes can cover-up mistakes
        updateDonation: builder.mutation({
            query: (id, donation_data) => ({
                url: `${id}`,
                body: donation_data,
                method: 'PUT'
            }),
            invalidatesTags: ['Admins', { type: 'Admin', id: id }]
        }),

        deleteDonation: builder.mutation({
            query: id => ({
                url: `${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Admins', { type: 'Admin', id: id }]
        }),


        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints

    })
})


export const {

} = adminApi