/**
 * REVIEW: This Slice is To manage State for one Particular Admin.
 * This can be Used in Places like:
 *  1. Specific Admin Pages
 *  2. Admin Profiles
 *  3. Retrieving some piece of Data for a particular Admin! 
 */


import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    adminDetails: {
        name: '',
        age: -1,
        email: '',
        contact: '',
        location: [],
        campaigns: [],
    },
    adminDonations: [],
    error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchAdminDetails = createAsyncThunk('admin_donations/fetchdonations', async (admin_id) => {
    // Here we need to fetch data of a particular Admin
    // Also if we can get his donations, but I think that would be better off in DonorDon!
    // Actually, we have to fetch the donations here.. Only 2 slices available for donor donations.
    // One is get all donors donations and other get one particualar donation.
    try {


        const admin_details = await (await axios.get('Path to get the detials of the Admin')).data


        // NOTE: Backend Route to get a particular Admins donations |> adminDonations/:admin_id/:category?

        const admin_donations = await (await axios.get('Path to get all the donations of the Admin')).data

        const adminDetails = { ...admin_details, admin_donations }
        return adminDetails

    } catch (error) {
        console.log("The error is handled by the middleware itsself so actually no need of this")
        return null
    }

})

// Generates pending, fulfilled and rejected action types
export const fetchAdminDonations = createAsyncThunk('admin_donations/fetchdonations', async (admin_id) => {
    // Here we need to fetch data of a particular Admin
    // Also if we can get his donations, but I think that would be better off in DonorDon!
    // Actually, we have to fetch the donations here.. Only 2 slices available for donor donations.
    // One is get all donors donations and other get one particualar donation.
    try {


        const admin_details = await (await axios.get('Path to get the detials of the Admin')).data


        // NOTE: Backend Route to get a particular Admins donations |> adminDonations/:admin_id/:category?

        const admin_donations = await (await axios.get('Path to get all the donations of the Admin')).data

        const adminDetails = { ...admin_details, admin_donations }
        return adminDetails

    } catch (error) {
        console.log("The error is handled by the middleware itsself so actually no need of this")
        return null
    }

})

const adminSlice = createSlice({
    name: 'admin_donations',
    initialState,

    // Most of these Reducers shall be called from inside the Extra-Reducers which make network requests to the backend!! 
    reducers: {
        addCampaign(state, action) {
            // Here a new Campaign should be added.
            // But this only happens when a new Campaign is created by the admin
            state.adminDetails.campaigns.push(action.payload)
        },

        addDonation(state, action) { state.adminDonations.push(action.payload) },
    },


    extraReducers: b => {

        /** 
         * Need extra Reducers for:
         *  1. Create Campaign - POST Request
         *  2. Make Donations - POST Request
         *  3. Retrieve Admin Details Data - Get Request
         *  4. Retrieve Admin Donations - Get Request
         *  3. ??? Will Figure Out What else  
         */

        b.addCase(fetchAdminDetails.pending, state => {
            state.loading = true
        })
        b.addCase(fetchAdminDetails.fulfilled, (state, action) => {
            state.loading = false
            state.adminDetails = action.payload
            state.error = ''
        })
        b.addCase(fetchAdminDetails.rejected, (state, action) => {
            state.loading = false
            state.adminDetails = []
            state.error = action.error.message
        })
    }
})

export const { AdminActions } = adminSlice.actions

export default adminSlice.reducer
// export { fetchUsers }