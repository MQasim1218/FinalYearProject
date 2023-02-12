import allCampaigns from './rootSlice'

export const campaignsApi = allCampaigns.injectEndpoints({
    endpoints: (builder) => ({

    })
})


export const {

    // SECTION: All Campaigns
    useAllCampaignsQuery,


    // SECTION: Admin campaigns
    useAdminCampaignsQuery,
    useSingleCampaignQuery
} = campaignsApi