
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const superadminApi = createApi({
    reducerPath: 'SuperAdmin',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BACKEND_BASE_ROUTE}/superAdmin` }),
    tagTypes: ['SuperAdmin'],

    endpoints: (builder) => ({

        // // 👨‍👨‍👦 Fetch all Admins 📷
        // allAdmins: builder.query({
        //     query: () => `/`,
        //     providesTags: [{ type: 'Admins' }]
        // }),

        // 👨‍👨‍👦 Fetch a particular Admin based on ones id 📷
        getSuperAdmin: builder.query({
            query: (id) => `${id}`,
            providesTags: [{ type: 'SuperAdmin', id: id }]
        }),

        // ! Do we allow creation of SuperAdmin ??? ❓ 
        // 👨‍👨‍👦 Create a new Admin in the database!!📷
        // createSuperAdmin: builder.mutation({
        //     query: superadmin_data => ({
        //         url: '/',
        //         body: superadmin_data,
        //         method: 'POST'
        //     }),
        //     invalidatesTags: ['SuperAdmin', { type: 'SuperAdmin', id: id }]
        // }),

        updateAdmin: builder.mutation({
            query: (id, superadmin_data) => ({
                url: `${id}`,
                body: superadmin_data,
                method: 'PUT'
            }),
            invalidatesTags: [{ type: 'SuperAdmin', id: id }]
        }),

        // deleteSuperAdmin: builder.mutation({
        //     query: id => ({
        //         url: `${id}`,
        //         body: superadmin_data,
        //         method: 'DELETE'
        //     }),
        //     invalidatesTags: ['Admins', { type: 'Admin', id: id }]
        // }),


        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints

    })
})


export const {
    useGetSuperAdminQuery,
    useUpdateAdminMutation,
} = superadminApi