
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const adminApi = createApi({
    reducerPath: 'AdminDonations',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BACKEND_BASE_ROUTE}/adminDonations` }),
    tagTypes: ['AdminDonations', 'AllAdminDonations'],

    // Endpoints are defined in seperate files and injected 
    // to this Reducer to reduce code-complexity and enhance organization!!
    endpoints: (builder) => ({})
})
