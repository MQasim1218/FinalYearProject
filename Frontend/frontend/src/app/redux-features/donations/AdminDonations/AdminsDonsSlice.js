import { rootAdminDonationsApi } from './rootSlice'

export const allAdminsDonationsApi = rootAdminDonationsApi.injectEndpoints({

    endpoints: (builder) => ({

        /**
         * ! Map each endpoint to a backend route!!
         */

        // 👨‍👨‍👦 Fetch all Admins' Donations 📷
        allAdminsDonations: builder.query({
            query: (category) => ({
                url: category == null ? `/` : `${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllAdminDonations' }]
        }),

        allAdminYearDonations: builder.query({
            query: (year, category) => ({
                url: category == null ? `${year}` : `${year}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllAdminDonations' }]
        }),

        allAdminMonthDonations: builder.query({
            query: (year, month, category) => ({
                url: category == null ? `${year}/${month}` : `${year}/${month}/${category}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'AllAdminDonations' }]
        }),
        // FIXME: Complete functionality for all backend routes.. Didnt make em to waste em!!
        // TODO: Map major backend routes to thier respective handler endpoints
    })
})