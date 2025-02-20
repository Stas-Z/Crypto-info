import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

import { initialState } from '../../slice/walletSlice'

export const getWalletState = (state: StateSchema) =>
    state?.addWallet || initialState

export const getPrivateKey = createSelector(
    getWalletState,
    (addWallet) => addWallet.privateKey,
)
export const getPasswordKey = createSelector(
    getWalletState,
    (addWallet) => addWallet.password,
)
