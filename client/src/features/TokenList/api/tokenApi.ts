import { IToken } from '@/entities/Token'
import { rtkApi } from '@/shared/api/rtkApi'

import { staticTokens } from '../const/tokens'

export const tokenApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getTokens: builder.query<IToken[], void>({
            query: () => ({
                url: 'tokens',
                method: 'GET',
            }),
            transformResponse: (response: [{ token: string }]) => {
                const result = staticTokens.map((token) => ({
                    ...token,
                    selected: response.some(
                        (item) => item.token === token.symbol,
                    ),
                }))

                return result
            },
        }),
        updateToken: builder.mutation<string[], string>({
            query: (selectedToken) => ({
                url: 'tokens',
                method: 'POST',
                body: { token: selectedToken },
            }),
            async onQueryStarted(selectedToken, thunkAPI) {
                const { dispatch, queryFulfilled } = thunkAPI
                try {
                    const { data } = await queryFulfilled

                    if (data) {
                        dispatch(
                            tokenApi.util.updateQueryData(
                                'getTokens',
                                undefined,
                                (draft) => {
                                    const token = draft.find(
                                        (item) => item.symbol === selectedToken,
                                    )
                                    if (token) {
                                        token.selected = !token.selected
                                    }
                                },
                            ),
                        )
                    }
                } catch (error) {
                    console.error('Error updating token cache:', error)
                }
            },
        }),
    }),
})

export const { useGetTokensQuery, useUpdateTokenMutation } = tokenApi
