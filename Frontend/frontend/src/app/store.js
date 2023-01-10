import { configureStore } from '@reduxjs/toolkit'
import adminDonReducer from './redux-features/donations/adminDonSlice'
import superAdminDonReducer from './redux-features/donations/SupAdminDonSlice'
import donorDonReducer from './redux-features/donations/DonorDonSlice'

const store = configureStore({
    reducer: {

        // Donation Reduces
        adminDonation: adminDonReducer,
        superAdminDonation: superAdminDonReducer,
        donorDonation: donorDonReducer,
        categoryDonation: categoryDonReducer,


        // User Reducers 🌄
        superAdmin: superAdminReducer,
        admins: adminReducer,
        donors: adminDonReducer,

        // Campaign Reducers 📸
        cowCamp: adminDonReducer,
        disasterCamp: disasterCampReducer,



        adminDonation: adminDonReducer,
        adminDonation: adminDonReducer,
        adminDonation: adminDonReducer,
    }
})

export default store