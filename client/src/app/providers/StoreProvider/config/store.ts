import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'

import { userReducer } from '@/entities/User'
import { addWalletReducer } from '@/features/AddWallet'
import { authMiddleware } from '@/features/AuthorizationForm'
import { rtkApi } from '@/shared/api/rtkApi'
import { __IS_DEV__ } from '@/shared/config/env'

import { createReducerManager } from './reducerManager'
import { StateSchema } from './StateSchema'

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        addWallet: addWalletReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    }

    const reducerManager = createReducerManager(rootReducers)

    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState as StateSchema,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(rtkApi.middleware)
                .concat(authMiddleware),
    })

    return { ...store, reducerManager }
}
