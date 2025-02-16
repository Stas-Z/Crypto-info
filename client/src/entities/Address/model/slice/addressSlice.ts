import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AddressSchema } from '../types/address'

export const initialState: AddressSchema = {
    currentAddress: '',
}

export const addressSlice = createSlice({
    name: 'addressList',
    initialState,
    reducers: {
        setCurrentAddress: (state, action: PayloadAction<string>) => {
            state.currentAddress = action.payload
        },
    },
})

export const { actions: addressActions } = addressSlice
export const { reducer: addressReducer } = addressSlice
