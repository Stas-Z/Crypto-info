import { ethers } from 'ethers'

import { PublicAddress } from '@/entities/Address'
import { rtkApi } from '@/shared/api/rtkApi'

interface AddWalletProps {
    privateKeys: string[]
}

interface DecryptWalletProps {
    encryptedJson: string
    password: string
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
                        throw new Error('Неверный приватный ключ')
                    }
                })

                return {
                    url: 'public-address',
                    method: 'POST',
                    body: { addresses },
                }
            },
        }),
        decryptWallet: builder.mutation<PublicAddress[], DecryptWalletProps>({
            query: ({ encryptedJson, password }) => {
                try {
                    const wallet = ethers.Wallet.fromEncryptedJsonSync(
                        encryptedJson,
                        password,
                    )

                    const address = wallet.address

                    return {
                        url: 'public-address',
                        method: 'POST',
                        body: { addresses: [address] },
                    }
                } catch (error) {
                    throw new Error(
                        'Не удалось расшифровать кошелек или извлечь адрес.',
                    )
                }
            },
        }),
    }),
})

export const { useAddAddressesMutation, useDecryptWalletMutation } = walletsApi
