import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const Campaigns = createApi({
    reducerPath: 'Campaigns',
    baseQuery: fetchBaseQuery({
        // ! Need to brainstorm where this campaign should goto ??
        baseUrl: `${process.env.REACT_APP_BACKEND_BASE_ROUTE}/generalCampaigns`,
        // prepareHeaders: 
    }),
    tagTypes: ['AllCampaigns', 'AdminCampaigns', 'Campaign',],
    
    endpoints: (builder) => ({

        // NOTE: This endpoint fetches all the campaigns created by the Admin.. 
        // Not those created by the benificiries
        allCampaigns: builder.query(
            {
                query: () => `/`,
                providesTags: ['AllCampaigns']
            }
        ),

        adminCampaigns: builder.query({
            query: (admin_id) => `/${admin_id}`,
            providesTags: (admin_id) => ['AdminCampaigns']
        }),

        singleCampaign: builder.query({
            query: (camp_id) => `/`
        })
    })
})


export default Campaigns;
