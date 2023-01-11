import { configureStore } from '@reduxjs/toolkit'

// Donation Reducers
import adminDonReducer from './redux-features/donations/adminDonSlice'
import superAdminDonReducer from './redux-features/donations/SupAdminDonSlice'
import donorDonReducer from './redux-features/donations/DonorDonSlice'
import categoryDonReducer from './redux-features/donations/CategoriesDonSlice'

// User Reducers 🌄
import adminsReducer from './redux-features/users/AdminsSlice'
import adminReducer from './redux-features/users/AdminSlice'
import donorsReducer from './redux-features/users/DonorsSlice'
import donorReducer from './redux-features/users/DonorSlice'
import superAdminReducer from './redux-features/users/'


const store = configureStore({
    reducer: {

        // Donation Reducers
        adminDonation: adminDonReducer,
        superAdminDonation: superAdminDonReducer,
        donorDonation: donorDonReducer,
        categoryDonation: categoryDonReducer,


        // User Reducers 🌄
        superAdmin: superAdminReducer,
        adminsAll: adminsReducer,
        adminIndv: adminReducer,
        donorsAll: donorsReducer,
        donorIndv: donorReducer,

        // Campaign Reducers 📸
        // TODO: Will look into these after the above reducers are finalized!!
        // cowCamp: adminDonReducer,
        // disasterCamp: disasterCampReducer,


    }
})

export default store