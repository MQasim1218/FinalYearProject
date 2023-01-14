
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const benificiaryApi = createApi({
    reducerPath: 'Benificiary',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.BACKEND_BASE_ROUTE}/benificiary`,
        prepareHeaders: (headers, { getState }) => {
            let { token } = getState().auth_user
            headers.set('authorization', `Bearer ${token}`)
        }
    }),
    tagTypes: ['Benificiary', 'Benificiaries'],

    endpoints: (builder) => ({

        // 👨‍👨‍👦 Fetch all Admins 📷
        allBenifs: builder.query({
            query: () => `/`,
            providesTags: [{ type: 'Benificiaries' }]
        }),

        // 👨‍👨‍👦 Fetch a particular Admin based on ones id 📷
        getBenif: builder.query({
            query: (id) => `${id}`,
            providesTags: (id) => [{ type: 'Benificiary', id: id }]
        }),

        // 👨‍👨‍👦 Create a new Admin in the database!!📷
        createBenif: builder.mutation({
            query: benif_data => ({
                url: '/',
                body: benif_data,
                method: 'POST'
            }),
            invalidatesTags: ['Benificiaries']
        }),

        updateBenif: builder.mutation({
            query: (id, benif_data) => ({
                url: `${id}`,
                body: benif_data,
                method: 'PUT'
            }),
            invalidatesTags: (id) => ['Benificiaries', { type: 'Benificiary', id: id }]
        }),

        deleteBenif: builder.mutation({
            query: id => ({
                url: `${id}`,
                body: id,
                method: 'DELETE'
            }),
            invalidatesTags: (id) => ['Benificiaries', { type: 'Benificiary', id: id }]
        }),


        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints

    })
})


export const {
    useGetBenifQuery,
    useAllBenifsQuery,
    useCreateBenifMutation,
    useUpdateBenifMutation,
    useDeleteBenifMutation
} = benificiaryApi