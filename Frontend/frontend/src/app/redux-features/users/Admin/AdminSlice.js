import { rootAdminApi } from './fetchApiSlice'


export const AdminApi = rootAdminApi.injectEndpoints({

    // Here we declare all the endpoints for Admin related backend requests!!
    endpoints: builder => ({

        // Fetch a particular Admin based on ones id
        getAdmin: builder.query({
            query: (id) => `${id}`,
            providesTags: [{ type: 'Admin', id: id }]
        })
    })
})