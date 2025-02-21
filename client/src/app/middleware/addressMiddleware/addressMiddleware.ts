import { Middleware } from '@reduxjs/toolkit'

import { addressActions } from '@/entities/Address'
import { addressApi } from '@/features/AddressList'
import { walletsApi } from '@/features/AddWallet'

import { AppDispatch, StateSchema } from '../../providers/StoreProvider'

interface Store {
    dispatch: AppDispatch
    getState: () => StateSchema
}

export const addressMiddleware: Middleware =
    (store: Store) => (next) => (action) => {
        if (
            walletsApi.endpoints.addAddresses.matchFulfilled(action) ||
            walletsApi.endpoints.decryptWallet.matchFulfilled(action) ||
            walletsApi.endpoints.getAddressesFromSeed.matchFulfilled(action)
        ) {
            const addresses = action.payload

            if (addresses.length > 0) {
                store.dispatch(
                    addressApi.util.updateQueryData(
                        'getAddresses',
                        undefined,
                        (draft) => {
                            draft.push(...addresses)
                        },
                    ),
                )
                store.dispatch(
                    addressActions.setCurrentAddress(addresses[0].address),
                )
            }
        }

        return next(action)
    }
