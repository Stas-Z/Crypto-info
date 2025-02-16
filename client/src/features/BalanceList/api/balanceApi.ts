import { IBalance } from '@/entities/Balance'
import { Token } from '@/entities/Token'
import { rtkApi } from '@/shared/api/rtkApi'

interface GetBalanceProps {
    address: string
    tokens: Token[]
}

export const balanceApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getBalance: builder.query<IBalance[], GetBalanceProps>({
            query: (data) => ({
                url: '/wallets/balance',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { useGetBalanceQuery } = balanceApi
