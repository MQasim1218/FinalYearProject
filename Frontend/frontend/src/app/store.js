import { configureStore } from '@reduxjs/toolkit'

// Donation Reducers
import adminDonReducer from './redux-features/Donations/AdminDonations/AdminDonSlice'
import superAdminDonReducer from './redux-features/donations/SupAdminDonSlice'
import donorDonReducer from './redux-features/donations/DonorDonSlice'
import categoryDonReducer from './redux-features/donations/CategoriesDonSlice'

// User Reducers 🌄
import { adminApi } from './redux-features/users/AdminSlice'
import { donorApi } from './redux-features/users/DonorSlice'
import { superadminApi } from './redux-features/users/SuperAdminSlice'


const store = configureStore({
    reducer: {

        // Donation Reducers
        adminDonation: adminDonReducer,
        superAdminDonation: superAdminDonReducer,
        donorDonation: donorDonReducer,
        categoryDonation: categoryDonReducer,


        // User Reducers 🌄
        [adminApi.reducerPath]: adminApi.reducer,
        [donorApi.reducerPath]: donorApi.reducer,
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
        ])
})

export default store