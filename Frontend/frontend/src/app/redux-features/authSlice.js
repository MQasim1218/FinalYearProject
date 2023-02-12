import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    accountType: "",
}

const authSlice = createSlice({
    name: 'AuthSLice',
    initialState,
    reducers: {
        setAuthDetails: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        clearAuthDetails: (state) => {
            state.user = null
            state.token = null
        }
    }
})


export default authSlice.reducer
export const { clearAuthDetails, setAuthDetails } = authSlice.actions