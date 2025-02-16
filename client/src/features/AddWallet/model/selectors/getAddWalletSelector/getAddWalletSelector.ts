import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

import { walletsApi } from '../../api/walletsApi'
import { initialState } from '../../slice/walletSlice'

export const getWalletState = (state: StateSchema) =>
    state?.addWallet || initialState

export const getPrivateKey = createSelector(
    getWalletState,
    (addWallet) => addWallet.privateKey,
)
export const getCurrentAddress = createSelector(
    getWalletState,
    (addWallet) => addWallet.currentAddress,
)

export const selectSelectedTokens = walletsApi.endpoints.getTokens.select()

export const getSelectedTokens = createSelector(
    selectSelectedTokens,
    (selectedTokensData) => {
        return selectedTokensData?.data?.filter((token) => token.selected) || []
    },
)
