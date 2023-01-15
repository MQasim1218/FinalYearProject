import { configureStore } from '@reduxjs/toolkit'

// Donation Reducers
import { adminDonationsApi } from './redux-features/Donations/AdminDonations/AdminDonsSlice'
import { donorDonationsApi } from './redux-features/Donations/DonorDonations/DonorDonsSlice'
import { superadminDonationsApi } from './redux-features/Donations/SupAdminDonations/SupAdminDonationsSlice'
// import donorDonReducer from './redux-features/donations/DonorDonSlice'
// import categoryDonReducer from './redux-features/donations/CategoriesDonSlice'

// Authentication Reducer!!
import authReducer from './redux-features/authSlice'

// User Reducers 🌄
import { adminApi } from './redux-features/users/AdminSlice'
import { donorApi } from './redux-features/users/DonorSlice'
import { superadminApi } from './redux-features/users/SuperAdminSlice'
import { benificiaryApi } from './redux-features/users/BenificiarySlice'


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
        [benificiaryApi.reducerPath]: benificiaryApi.reducer,
        [superadminApi.reducerPath]: superadminApi.reducer,


        // Campaign Reducers 📸
        // TODO: Will look into these after the above reducers are finalized!!
        // cowCamp: adminDonReducer,
        // disasterCamp: disasterCampReducer,


    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([

            // User reducer middlewares!! Dont 
            adminApi.middleware,
            donorApi.middleware,
            superadminApi.middleware,
            benificiaryApi.middleware,
            donorDonationsApi.middleware,
            adminDonationsApi.middleware,
            superadminDonationsApi.middleware
        ])
})

export default store