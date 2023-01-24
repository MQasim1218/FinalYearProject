import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";


const CowCampaign = createApi({
    reducerPath: 'campaignCow',
    baseQuery: fetchBaseQuery({
        // ! Need to brainstorm where this campaign should goto ??
        baseUrl: `${process.env.REACT_APP_BACKEND_BASE_ROUTE}/generalCampaigns`
    }),
    tagTypes: ['Campaign', 'AllCampaigns', 'AdminCampaigns'],
    endpoints: {}
})