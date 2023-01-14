
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'




export const adminApi = createApi({
    reducerPath: 'Admin',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_BASE_ROUTE}/admin`,
        prepareHeaders: (headers, { getState }) => {
            // console.log(getState()) - No need to print the entire state!!
            let { token } = getState().auth_user
            console.log("TOken from the Slice:", token)
            headers.set('authorization', `Bearer ${token}`)
            console.log(process.env.REACT_APP_BACKEND_BASE_ROUTE)
        }
    }),
    tagTypes: ['Admin', 'Admins'],


    endpoints: (builder) => ({

        // 👨‍👨‍👦 Fetch all Admins 📷
        allAdmins: builder.query({
            query: () => `/`,
            providesTags: ['Admins']
        }),

        // 👨‍👨‍👦 Fetch a particular Admin based on ones id 📷
        getAdmin: builder.query({
            query: (id) => `${id}`,
            providesTags: (id) => [{ type: 'Admin', id: id }]
        }),

        // 👨‍👨‍👦 Create a new Admin in the database!!📷
        createAdmin: builder.mutation({
            query: admin_data => ({
                url: '/',
                body: admin_data,
                method: 'POST'
            }),
            invalidatesTags: (id) => ['Admins', { type: 'Admin', id: id }]
        }),

        updateAdmin: builder.mutation({
            query: (id, admin_data) => ({
                url: `${id}`,
                body: admin_data,
                method: 'PUT'
            }),
            invalidatesTags: (id) => ['Admins', { type: 'Admin', id: id }]
        }),

        deleteAdmin: builder.mutation({
            query: id => ({
                url: `${id}`,
                ethod: 'DELETE'
            }),
            invalidatesTags: (id) => ['Admins', { type: 'Admin', id: id }]
        }),


        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints

    })
})


export const {
    useCreateAdminMutation,
    useGetAdminQuery,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
    useAllAdminsQuery
} = adminApi