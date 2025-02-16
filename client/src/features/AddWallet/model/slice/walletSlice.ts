import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AddWalletSchema } from '../types/addWalletSchema'

export const initialState: AddWalletSchema = {
    privateKey: '',
    currentAddress: '',
}

export const addWalletSlice = createSlice({
    name: 'addWallet',
    initialState,
    reducers: {
        setPrivateKey: (state, action: PayloadAction<string>) => {
            state.privateKey = action.payload
        },
        setCurrentAddress: (state, action: PayloadAction<string>) => {
            state.currentAddress = action.payload
        },
    },
})

export const { actions: addWalletActions } = addWalletSlice
export const { reducer: addWalletReducer } = addWalletSlice
