import { Middleware } from '@reduxjs/toolkit'

import { addressApi } from '@/features/AddressList'
import { walletsApi } from '@/features/AddWallet'

import { AppDispatch, StateSchema } from '../../providers/StoreProvider'

interface Store {
    dispatch: AppDispatch
    getState: () => StateSchema
}

export const addressMiddleware: Middleware =
    (store: Store) => (next) => (action) => {
        if (walletsApi.endpoints.addAddresses.matchFulfilled(action)) {
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
            }
        }
        if (walletsApi.endpoints.decryptWallet.matchFulfilled(action)) {
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
            }
        }

        return next(action)
    }
