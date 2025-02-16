import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'

import { userReducer } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'
import { __IS_DEV__ } from '@/shared/config/env'

import { createReducerManager } from './reducerManager'
import { StateSchema } from './StateSchema'
import { addressMiddleware } from '../../../middleware/addressMiddleware/addressMiddleware'
import { authMiddleware } from '../../../middleware/authMiddleware/authMiddleware'

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
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
                .concat(addressMiddleware)
                .concat(authMiddleware),
    })

    return { ...store, reducerManager }
}
