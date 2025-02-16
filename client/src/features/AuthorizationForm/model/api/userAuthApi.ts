'use client'
import { User, userActions } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

interface AuthByEmailProps {
    email: string
    password: string
}

const userAuthApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        authByEmail: build.mutation<User, AuthByEmailProps>({
            query: (authData) => ({
                url: 'auth/login',
                method: 'POST',
                body: authData,
            }),
            onQueryStarted: async (_, thunkAPI) => {
                const { dispatch, queryFulfilled } = thunkAPI
                try {
                    const { data } = await queryFulfilled
                    dispatch(userActions.setUser(data))
                    localStorage.setItem(USER_LOCALSTORAGE_KEY, data.id)
                } catch (err) {
                    console.error(err)
                }
            },
        }),
        regByEmail: build.mutation<{ message: string }, AuthByEmailProps>({
            query: (authData) => ({
                url: 'users',
                method: 'POST',
                body: authData,
            }),
        }),
    }),
})

export const useAuthByMail = userAuthApi.useAuthByEmailMutation
export const useRegByMail = userAuthApi.useRegByEmailMutation
