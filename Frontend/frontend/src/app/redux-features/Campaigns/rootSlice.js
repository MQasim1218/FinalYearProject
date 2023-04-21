import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const Campaigns = createApi({
    reducerPath: 'Campaigns',
    baseQuery: fetchBaseQuery({
        // ! Need to brainstorm where this campaign should goto ??
        baseUrl: `${process.env.REACT_APP_BACKEND_BASE_ROUTE}/gen_campaigns`,
        // prepareHeaders: 
    }),
    tagTypes: ['AllCampaigns', 'AdminCampaigns', 'Campaign',],

    endpoints: (builder) => ({

        // NOTE: This endpoint fetches all the campaigns created by the Admin.. 
        // Not those created by the benificiries
        allCampaigns: builder.query(
            {
                query: () => `/`,
                providesTags: ['AllCampaigns', "Campaign"]
                // {
                //     'AllCam': data...
                // }
            }
        ),

        adminCampaigns: builder.query({
            query: (admin_id) => `admin/${admin_id}`,
            providesTags: (admin_id) => ['AdminCampaigns']
        }),

        singleCampaign: builder.query({
            query: (camp_id) => `/${camp_id}`,
            providesTags: (camp_id) => [{ type: "Campaign", id: camp_id }]
        }),

        createCampaign: builder.mutation({
            query: (admin_id) => ({
                url: `admin/${admin_id}`,
                method: 'POST'
            }),
            invalidatesTags: ['AllCampaigns', 'AdminCampaigns']

        })
    })
})


export default Campaigns;
