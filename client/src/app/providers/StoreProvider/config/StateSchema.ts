import { EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'

import { AddressSchema } from '@/entities/Address'
import { UserSchema } from '@/entities/User'
import { AddWalletSchema } from '@/features/AddWallet'
import { AuthSchema } from '@/features/AuthorizationForm'
import { rtkApi } from '@/shared/api/rtkApi'

import { createReduxStore } from './store'

export interface StateSchema {
    user: UserSchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    address?: AddressSchema
    addWallet?: AddWalletSchema
    authForm?: AuthSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: Reducer<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
    dispatch: EnhancedStore<StateSchema>['dispatch']
    getState: EnhancedStore<StateSchema>['getState']
}

export interface ThunkConfig<T> {
    rejectValue: T
    state: StateSchema
}

export type RootState = ReturnType<typeof createReduxStore>['getState']
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
