import { configureStore } from '@reduxjs/toolkit'

// Donation Reducers
import { adminDonationsApi } from './redux-features/donations/AdminDonations/AdminDonsSlice'
import { donorDonationsApi } from './redux-features/donations/DonorDonations/DonorDonsSlice'
import { superadminDonationsApi } from './redux-features/donations/SupAdminDonations/SupAdminDonationsSlice'
// import donorDonReducer from './redux-features/donations/DonorDonSlice'
// import categoryDonReducer from './redux-features/donations/CategoriesDonSlice'

// Authentication Reducer!!
import authReducer from './redux-features/authSlice'

// User Reducers 🌄
import { adminApi } from './redux-features/users/AdminSlice'
import { donorApi } from './redux-features/users/DonorSlice'
import { superadminApi } from './redux-features/users/SuperAdminSlice'
import { beneficiaryApi } from './redux-features/users/BeneficiarySlice'
import { campaignsApi } from './redux-features/Campaigns/exporterSlice'

const store = configureStore({
    reducer: {

        // ! Authenticated User Info Reducers
        auth_user: authReducer,

        // * Donation Reducers
        [adminDonationsApi.reducerPath]: adminDonationsApi.reducer,
        [donorDonationsApi.reducerPath]: donorDonationsApi.reducer,
        [superadminDonationsApi.reducerPath]: superadminDonationsApi.reducer,
        // categoryDonation: categoryDonReducer,


        // User Reducers 🌄
        [adminApi.reducerPath]: adminApi.reducer,
        [donorApi.reducerPath]: donorApi.reducer,
        [beneficiaryApi.reducerPath]: beneficiaryApi.reducer,
        [superadminApi.reducerPath]: superadminApi.reducer,


        // Campaign Reducers 📸
        // TODO: Will look into these after the above reducers are finalized!!
        [campaignsApi.reducerPath]: campaignsApi.reducer,
        // cowCamp: adminDonReducer,
        // disasterCamp: disasterCampReducer,


    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(adminApi.middleware)
            .concat(donorApi.middleware)
            .concat(superadminApi.middleware)
            .concat(beneficiaryApi.middleware)
            .concat(donorDonationsApi.middleware)
            .concat(adminDonationsApi.middleware)
            .concat(superadminDonationsApi.middleware)
            .concat(campaignsApi.middleware)
})

export default store