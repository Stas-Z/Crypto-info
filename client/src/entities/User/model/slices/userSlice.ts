import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User, UserSchema } from '../types/userSchema'

const initialState: UserSchema = {
    isAuth: false,
    currentUser: { email: '', id: '' },
    _inited: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            state.isAuth = false
        },
        setInited: (state) => {
            state._inited = true
        },
    },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
