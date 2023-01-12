
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const adminApi = createApi({
    reducerPath: 'Admin',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BACKEND_BASE_ROUTE}/admin` }),
    tagTypes: ['Admin', 'Admins'],

    endpoints: (builder) => ({

        // 👨‍👨‍👦 Fetch all Admins 📷
        allAdmins: builder.query({
            query: () => `/`,
            providesTags: [{ type: 'Admins' }]
        }),

        // 👨‍👨‍👦 Fetch a particular Admin based on ones id 📷
        getAdmin: builder.query({
            query: (id) => `${id}`,
            providesTags: [{ type: 'Admin', id: id }]
        }),

        // 👨‍👨‍👦 Create a new Admin in the database!!📷
        createAdmin: builder.mutation({
            query: admin_data => ({
                url: '/',
                body: admin_data,
                method: 'POST'
            }),
            invalidatesTags: ['Admins', { type: 'Admin', id: id }]
        }),

        updateAdmin: builder.mutation({
            query: (id, admin_data) => ({
                url: `${id}`,
                body: admin_data,
                method: 'PUT'
            }),
            invalidatesTags: ['Admins', { type: 'Admin', id: id }]
        }),

        deleteAdmin: builder.mutation({
            query: id => ({
                url: `${id}`,
                body: admin_data,
                method: 'DELETE'
            }),
            invalidatesTags: ['Admins', { type: 'Admin', id: id }]
        }),


        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints

    })
})


export const {
    useCreateAdminMutation,
    useGetAdminQuery,
    useAllAdminsQuery,
    useUpdateAdminMutation,
    useDeleteAdminMutation
} = adminApi