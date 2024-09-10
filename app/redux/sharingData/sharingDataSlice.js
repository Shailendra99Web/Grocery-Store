import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    jwt: '',
    userId: {},
    updateCart: false,
    username: '',
    email: '',
    phone: '',
    zip: '',
    address: '',
    subTotal: 0,
    totalAmount: 0,
    cartItemList: [],
    loadingBarProgress: 0
}

export const sharingDataSlice = createSlice({
    name: 'sharingData',
    initialState,
    reducers: {

        jwt_Reducer: (state, action) => {
            console.log('sharingDataSlice = '+action.payload)
            state.jwt = action.payload
        },
        userId_Reducer: (state, action) => {
            state.userId = action.payload
        },
        username_Reducer: (state, action) => {
            state.username = action.payload
        },
        email_Reducer: (state, action) => {
            state.email = action.payload
        },
        phone_Reducer: (state, action) => {
            state.phone = action.payload
        },
        zip_Reducer: (state, action) => {
            state.zip = action.payload
        },
        address_Reducer: (state, action) => {
            state.address = action.payload
        },
        totalAmount_Reducer: (state, action) => {
            state.totalAmount = action.payload
        },
        cartItemList_Reducer: (state, action) => {
            state.cartItemList = action.payload
        },
        updateCart_Reducer: (state, action) => {
            state.updateCart = action.payload
        },
        subTotal_Reducer: (state, action) => {
            state.subTotal = action.payload
        },
        loadingBarProgress_Reducer: (state, action) => {
            state.loadingBarProgress = action.payload
        },

        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
        // multiply: (state) => {
        //     state.value *= 2
        // }
    },
})

// Action creators are generated for each case reducer function
export const { jwt_Reducer, userId_Reducer, username_Reducer, email_Reducer, phone_Reducer, zip_Reducer, address_Reducer, totalAmount_Reducer, cartItemList_Reducer, updateCart_Reducer, subTotal_Reducer, loadingBarProgress_Reducer} = sharingDataSlice.actions

export default sharingDataSlice.reducer