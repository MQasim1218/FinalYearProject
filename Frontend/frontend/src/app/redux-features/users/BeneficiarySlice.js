
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const beneficiaryApi = createApi({
    reducerPath: 'Beneficiary',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_BASE_ROUTE}/beneficiary`,
        // prepareHeaders: (headers, { getState }) => {
        //     let { token } = getState().auth_user
        //     headers.set('authorization', `Bearer ${token}`)
        // }
    }),
    tagTypes: ['Beneficiary', 'Beneficiaries'],

    endpoints: (builder) => ({

        // 👨‍👨‍👦 Fetch all Beneficiaries 📷
        allBenefs: builder.query({
            query: () => {
                // console.log(`Ben Route: ${process.env.REACT_APP_BACKEND_BASE_ROUTE}/beneficiary`)
                // console.log('Fetching all the beneficiaries data!')
                return `/`
            },
            providesTags: ['Beneficiaries']
        }),

        // 👨‍👨‍👦 Fetch a particular Admin based on ones id 📷
        getBenef: builder.query({
            query: (id) => `/single/${id}`,
            providesTags: (id) => [{ type: 'Beneficiary', id: id }]
        }),

        // 👨‍👨‍👦 Create a new Admin in the database!!📷
        createBenef: builder.mutation({
            query: benef_data => ({
                url: '/',
                body: benef_data,
                method: 'POST'
            }),
            invalidatesTags: ['Beneficiaries']
        }),

        updateBenef: builder.mutation({
            query: (id, benef_data) => ({
                url: `${id}`,
                body: benef_data,
                method: 'PUT'
            }),
            invalidatesTags: (id) => ['Beneficiaries', { type: 'Beneficiary', id: id }]
        }),

        deleteBenef: builder.mutation({
            query: id => ({
                url: `${id}`,
                body: id,
                method: 'DELETE'
            }),
            invalidatesTags: (id) => ['Beneficiaries', { type: 'Beneficiary', id: id }]
        }),


        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints

    })
})


export const {
    useGetBenefQuery,
    useAllBenefsQuery,
    useCreateBenefMutation,
    useUpdateBenefMutation,
    useDeleteBenefMutation
} = beneficiaryApi