import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AddWalletSchema } from '../types/addWalletSchema'

export const initialState: AddWalletSchema = {
    privateKey: '',
}

export const addWalletSlice = createSlice({
    name: 'addWallet',
    initialState,
    reducers: {
        setPrivateKey: (state, action: PayloadAction<string>) => {
            state.privateKey = action.payload
        },
    },
})

export const { actions: addWalletActions } = addWalletSlice
export const { reducer: addWalletReducer } = addWalletSlice
