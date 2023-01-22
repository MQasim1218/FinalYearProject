import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


// Need to somehow conigure this to dynamically adjust to all fetch requests
// ? Tentative solution.. Need to test if this works. If this does.. 🧮
// * Then its a generic solution much better than re-writing for all reducers.🛫
// ! Easy to import 😇


export const thunkFetch_asyncGet = (action, url) => {
    return createAsyncThunk(action, () => {
        return axios
            .get(
                url,
            )
            .then(response => response.data)
    })
}




////  Hope this works
export const thunkFetch_asyncPost = (action, url, post_data) => {
    return createAsyncThunk(action, () => {
        return axios
            .post(
                url,
                post_data
            )
            .then(response => response.data)
    })
}





export const thunkFetch_asyncPut = createAsyncThunk('admin_donations/fetchdonations', () => {
    return axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => response.data)
})


export const thunkFetch_asyncDelete = createAsyncThunk('admin_donations/fetchdonations', () => {
    return axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => response.data)
})


export const thunkFetch_asyncPatch = createAsyncThunk('admin_donations/fetchdonations', () => {
    return axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => response.data)
})