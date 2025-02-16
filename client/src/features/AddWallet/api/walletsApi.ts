import { ethers } from 'ethers'

import { PublicAddress } from '@/entities/Address'
import { rtkApi } from '@/shared/api/rtkApi'

interface AddWalletProps {
    privateKeys: string[]
}

export const walletsApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
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
        }),
    }),
})

export const { useAddAddressesMutation } = walletsApi
