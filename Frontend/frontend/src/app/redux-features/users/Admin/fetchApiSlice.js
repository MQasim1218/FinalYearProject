
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const rootAdminApi = createApi({
    reducerPath: 'Admin',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BACKEND_BASE_ROUTE}/admin` }),
    endpoints: (bldr) => ({})
})