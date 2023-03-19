
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const donorApi = createApi({
    reducerPath: 'Donor',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_BASE_ROUTE}/donor`,
        // prepareHeaders: (headers, { getState }) => {
        //     let { token } = getState().auth_user
        //     headers.set('authorization', `Bearer ${token}`)
        // }
    }),
    tagTypes: ['Donor', 'Donors'],

    endpoints: (builder) => ({

        // 👨‍👨‍👦 Fetch all Admins 📷
        allDonors: builder.query({
            query: () => {
                console.log(`Donors Route: ${process.env.REACT_APP_BACKEND_BASE_ROUTE}/donor`)
                return `/`
            },
            providesTags: [{ type: 'Donors' }]
        }),

        // 👨‍👨‍👦 Fetch a particular Admin based on ones id 📷
        getDonor: builder.query({
            query: (id) => `${id}`,
            providesTags: (id) => [{ type: 'Donor', id: id }]
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
            invalidatesTags: (id) => ['Donors', { type: 'Donor', id: id }]
        }),

        deleteAdmin: builder.mutation({
            query: id => ({
                url: `${id}`,
                body: id,
                method: 'DELETE'
            }),
            invalidatesTags: (id) => ['Donors', { type: 'Donor', id: id }]
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