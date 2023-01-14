import { rootDonorDonationsApi } from './rootSlice'

export const allDonorDonationsApi = rootDonorDonationsApi.injectEndpoints({

    endpoints: (builder) => ({

        /**
         * ! Map each endpoint to a backend route!!
         * Tags::|> ['DonorDonations', 'AllDonorsDonations']
         */

        // 👨‍👨‍👦 Fetch all Admins' Donations 📷
        allDonorsDonations: builder.query({
            query: (category) => ({
                url: category == null ? `/` : `${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllDonorsDonations' }]
        }),

        allDonorsYearDonations: builder.query({
            query: (year, category) => ({
                url: category == null ? `${year}` : `${year}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllDonorsDonations' }]
        }),

        allDonorsMonthDonations: builder.query({
            query: (year, month, category) => ({
                url: category == null ? `${year}/${month}` : `${year}/${month}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllDonorsDonations' }]
        }),
        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints
    })
})