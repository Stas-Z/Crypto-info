'use client'
import { Middleware } from '@reduxjs/toolkit'

import { AppDispatch, StateSchema } from '@/app/providers/StoreProvider'
import { addressActions } from '@/entities/Address'
import { userActions } from '@/entities/User'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

interface Store {
    dispatch: AppDispatch
    getState: () => StateSchema
}

export const authMiddleware: Middleware =
    (store: Store) => (next) => (action) => {
        if (userActions.logout.match(action)) {
            store.dispatch(addressActions.setCurrentAddress(''))

            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        }

        next(action)
    }
