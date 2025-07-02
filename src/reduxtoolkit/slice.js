import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
}

export const counterSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        updateIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
    },
})

export const { updateIsLoggedIn } = counterSlice.actions

export default counterSlice.reducer