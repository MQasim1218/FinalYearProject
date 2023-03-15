import { allAdminsDonationsApi } from './AdminsDonsSlice'

export const adminDonationsApi = allAdminsDonationsApi.injectEndpoints({


    endpoints: (builder) => ({

        /**
         * ! Map each endpoint to a backend route!!
         * ! Need to Pay Attention to Tags
         */

        // 👨‍👨‍👦 Fetch all Admins' Donations 📷
        singleAdminDonations: builder.query({
            query: (adminId, category) => ({
                url: category == null ? `admin/${adminId}` : `admin/${adminId}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AdminDonations' }]
        }),

        getDonationsFromSingle_SADonation: builder.query({
            query: (supAdmin_don) => `superdonation/${supAdmin_don}`,
            providesTags: (supAdmin_don) => [{ type: "SingleSuperDonation", id: supAdmin_don }]
        }),

        // 👨‍👨‍👦 Fetch all Admins' Donations 📷
        singleCampaignDonations: builder.query({
            query: (campId) => ({
                url: `camp/${campId}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'CampaingDonations' }]
        }),

        singleAdminYearDonations: builder.query({
            query: (adminId, year, category) => ({
                url: category == null ? `${adminId}/${year}` : `${adminId}/${year}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AdminDonations' }]
        }),

        singleAdminMonthDonations: builder.query({
            query: (adminId, year, month, category) => ({
                url: category == null ? `${adminId}/${year}/${month}` : `${adminId}/${year}/${month}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AdminDonations' }]
        }),

        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints

    })
})


export const {

    // All Admins Queries
    useAllAdminsDonationsQuery,
    useAllAdminYearDonationsQuery,
    useAllAdminMonthDonationsQuery,



    // Single Admin Queries
    useSingleAdminDonationsQuery,
    useSingleAdminYearDonationsQuery,
    useSingleAdminMonthDonationsQuery,
    useSingleCampaignDonationsQuery,


    // Top Level Actions
    useGetDonationQuery,
    useDonateToCampaignMutation,
    useGetDonationsFromSingle_SADonationQuery

} = adminDonationsApi