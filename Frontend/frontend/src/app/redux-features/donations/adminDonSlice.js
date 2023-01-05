import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    adminDonations: [],
    error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchAdminDonations = createAsyncThunk('admin_donations/fetchdonations', () => {
    return axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => response.data)
})

const userSlice = createSlice({
    name: 'admin_donations',
    initialState,
    extraReducers: b => {
        b.addCase(fetchAdminDonations.pending, state => {
            state.loading = true
        })
        b.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        b.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer
// export { fetchUsers }