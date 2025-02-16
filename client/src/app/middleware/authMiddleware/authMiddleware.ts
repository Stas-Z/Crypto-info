'use client'
import { Dispatch } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'
import { userActions } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

interface Store {
    dispatch: Dispatch
    getState: () => StateSchema
}

export const authMiddleware =
    (store: Store) =>
    (next: (action: unknown) => unknown) =>
    (action: unknown): void => {
        if (userActions.logout.match(action)) {
            store.dispatch(rtkApi.util.resetApiState())
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        }

        next(action)
    }
