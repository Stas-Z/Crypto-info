import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

import { initialState } from '../../slice/addressSlice'

export const getAddressState = (state: StateSchema) =>
    state?.address || initialState

export const getCurrentAddress = createSelector(
    getAddressState,
    (address) => address.currentAddress,
)
