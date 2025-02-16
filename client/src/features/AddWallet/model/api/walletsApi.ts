import { ethers } from 'ethers'

import { PublicAddress } from '@/entities/Wallet'
import { rtkApi } from '@/shared/api/rtkApi'

import { staticTokens } from '../../const/tokens'
import { Balance, Token } from '../types/addWalletSchema'

interface AddWalletProps {
    privateKeys: string[]
}
interface GetBalanceProps {
    address: string
    tokens: Token[]
}

export const walletsApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getAddresses: builder.query<PublicAddress[], void>({
            query: () => {
                return {
                    url: 'public-address',
                    method: 'GET',
                }
            },
        }),
        addAddresses: builder.mutation<PublicAddress[], AddWalletProps>({
            query: (data) => {
                const addresses = data.privateKeys.map((key) => {
                    try {
                        const wallet = new ethers.Wallet(key)
                        return wallet.address
                    } catch {
                        throw new Error('Invalid private key')
                    }
                })

                return {
                    url: 'public-address',
                    method: 'POST',
                    body: { addresses },
                }
            },
            onQueryStarted: async (_, thunkAPI) => {
                const { dispatch, queryFulfilled } = thunkAPI
                try {
                    const { data } = await queryFulfilled

                    if (data) {
                        dispatch(
                            walletsApi.util.updateQueryData(
                                'getAddresses',
                                undefined,
                                (draft) => {
                                    draft.push(...data)
                                },
                            ),
                        )
                    }
                } catch (err) {
                    console.error('Error adding wallets:', err)
                }
            },
        }),

        getTokens: builder.query<Token[], void>({
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
                            walletsApi.util.updateQueryData(
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
        getBalance: builder.query<Balance[], GetBalanceProps>({
            query: (data) => ({
                url: '/wallets/balance',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const {
    useAddAddressesMutation,
    useGetAddressesQuery,
    useGetTokensQuery,
    useUpdateTokenMutation,
    useGetBalanceQuery,
} = walletsApi
