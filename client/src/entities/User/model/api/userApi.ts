import { rtkApi } from '@/shared/api/rtkApi'

import { userActions } from '../slices/userSlice'
import { User } from '../types/userSchema'

export const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        initAuthData: build.query<User, void>({
            query: () => ({
                url: 'auth/refresh',
                method: 'POST',
            }),

            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        dispatch(userActions.setUser(data.data))
                    }
                } catch (err) {
                    console.error(err)
                }
            },
        }),
    }),
})

export const useInitAuthData = userApi.useInitAuthDataQuery
