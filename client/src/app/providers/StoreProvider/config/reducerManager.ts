import {
    Reducer,
    ReducersMapObject,
    UnknownAction,
    combineReducers,
} from '@reduxjs/toolkit'

import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema'

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
    const reducers: ReducersMapObject<StateSchema> = {
        ...initialReducers,
    }

    let combinedReducer = combineReducers(reducers) as Reducer<
        StateSchema,
        UnknownAction
    >

    let keysToRemove: Array<StateSchemaKey> = []

    return {
        getReducerMap: () => reducers,

        reduce: (state: StateSchema | undefined, action: UnknownAction) => {
            if (keysToRemove.length > 0 && state) {
                state = { ...state }
                keysToRemove.forEach((key) => {
                    delete state?.[key]
                })
                keysToRemove = []
            }

            return combinedReducer(state, action)
        },

        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return
            }

            reducers[key] = reducer
            combinedReducer = combineReducers(reducers) as Reducer<
                StateSchema,
                UnknownAction
            >
        },

        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return
            }

            delete reducers[key]
            keysToRemove.push(key)
            combinedReducer = combineReducers(reducers) as Reducer<
                StateSchema,
                UnknownAction
            >
        },
    }
}
