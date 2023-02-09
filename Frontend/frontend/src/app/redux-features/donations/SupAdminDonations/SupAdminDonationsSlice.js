
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const superadminDonationsApi = createApi({
    reducerPath: 'SuperAdminDonations',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_BASE_ROUTE}/superAdminDonations`,
        // prepareHeaders: (headers, { getState }) => {
        //     let { token } = getState().auth_user
        //     headers.set('authorization', `Bearer ${token}`)
        // }
    }),
    tagTypes: ['SuperAdminDonations'],


    endpoints: (builder) => ({

        // 👨‍👨‍👦 Fetch all Admins 📷
        allSuperAdminDonations: builder.query({
            query: (category) => category == null ? `/` : `/${category}`,
            providesTags: ['SuperAdminDonations', 'SuperAdminDonationsToAdmin']
        }),

        // 👨‍👨‍👦 Fetch a particular Admin based on ones id 📷
        getSuperAdminDonationsToAdmin: builder.query({
            query: (admin_id, category) => category == null ? `/admin/${admin_id}` : `/admin/${admin_id}/${category}`,
            providesTags: (id) => [{ type: 'SuperAdminDonationsToAdmin' }]
        }),



        // ! Not sure if this functionality is supported! However, this can be helpful to correct bad entries!!
        // * Ideally, the SuperAdmin shouldnt be able to update Donation values once the donation has been made!!
        // updateAdmin: builder.mutation({
        //     query: (id, admin_data) => ({
        //         url: `${id}`,
        //         body: admin_data,
        //         method: 'PUT'
        //     }),
        //     invalidatesTags: (id) => ['Admins', { type: 'Admin', id: id }]
        // }),

        // ! Not sure if this functionality is supported! However, this could be useful to remove bad entries!!
        // * Ideally, the SuperAdmin shouldnt be able to update Donation values once the donation has been made!!
        // deleteAdmin: builder.mutation({
        //     query: id => ({
        //         url: `${id}`,
        //         ethod: 'DELETE'
        //     }),
        //     invalidatesTags: (id) => ['Admins', { type: 'Admin', id: id }]
        // }),


        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints

        // 👨‍👨‍👦 Create a new Admin in the database!!📷
        donateToAdmin: builder.mutation({
            query: (don_data) => ({
                url: '/donate',
                body: don_data,
                method: 'POST'
            }),

            // Pick out data and prevent nested properties in a hook or selector
            transformResponse: response => response.data,

            // Pick out errors and prevent nested properties in a hook or selector
            transformErrorResponse: response => response.status,

            // ! Trigger Refetching
            invalidatesTags: (id) => ['SuperAdminDonations', 'SuperAdminDonationsToAdmin']
        }),


        registerDonorDonation: builder.mutation({
            query: (don_donation) => ({
                url: `/registerDonation`,
                body: don_donation,
                method: 'POST'
            }),

            // Pick out data and prevent nested properties in a hook or selector
            transformResponse: response => response.data,

            // Pick out errors and prevent nested properties in a hook or selector
            transformErrorResponse: response => response.status,

            // ! Need to make sure if these are the tags to renewww!!
            invalidatesTags: (id) => ['SuperAdminDonations', 'SuperAdminDonationsToAdmin']
        })
    })
})


export const {
    useGetSuperAdminDonationsToAdminQuery,
    useAllSuperAdminDonationsQuery,

    // STUB: All mutations down here!!
    useDonateToAdminMutation,
    useRegisterDonorDonationMutation,
} = superadminDonationsApi