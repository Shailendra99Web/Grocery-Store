import { configureStore } from '@reduxjs/toolkit'
import sharingDataReducer from "./sharingData/sharingDataSlice"

export const store = configureStore({
    reducer: {
        sharingData: sharingDataReducer,
    },
})