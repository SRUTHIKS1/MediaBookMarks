import { configureStore } from '@reduxjs/toolkit'

import mediaReducer from "./slice"

export const store = configureStore({
    reducer: {
        media: mediaReducer,
       
    },
})