import { allDonorDonationsApi } from './DonorsDonsSlice'

export const donorDonationsApi = allDonorDonationsApi.injectEndpoints({

    endpoints: (builder) => ({

        /**
         * ! Map each endpoint to a backend route!!
         * ! Need to Pay Attention to Tags
         */

        // 👨‍👨‍👦 Fetch all Admins' Donations 📷
        singleDonorDonations: builder.query({
            query: (donorId, category) => ({
                url: category == null ? `${donorId}` : `${adminId}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'DonorDonations' }]
        }),

        singleDonorYearDonations: builder.query({
            query: (donorId, year, category) => ({
                url: category == null ? `${donorId}/${year}` : `${adminId}/${year}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'DonorDonations' }]
        }),

        singleDonorMonthDonations: builder.query({
            query: (donorId, year, month, category) => ({
                url: category == null ? `${donorId}/${year}/${month}` : `${adminId}/${year}/${month}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'DonorDonations' }]
        }),

        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints

    })
})


export const {

    // All Admins Queries
    useAllDonorsDonationsQuery,
    useAllDonorsYearDonationsQuery,
    useAllDonorsMonthDonationsQuery,

    // Single Admin Queries
    useSingleDonorDonationsQuery,
    useSingleDonorYearDonationsQuery,
    useSingleDonorMonthDonationsQuery,

    // Top Level Actions
    useGetDonationQuery,
    useDonateMutation,

} = donorDonationsApi