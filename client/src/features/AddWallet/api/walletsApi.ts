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

interface GetAddressesFromSeedProps {
    seedFraze: string
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
        getAddressesFromSeed: builder.mutation<
            PublicAddress[],
            GetAddressesFromSeedProps
        >({
            query: ({ seedFraze }) => {
                try {
                    const mnemonicObj = ethers.Mnemonic.fromPhrase(seedFraze)
                    const addresses: string[] = []

                    for (let i = 0; i < 5; i++) {
                        const wallet = ethers.HDNodeWallet.fromMnemonic(
                            mnemonicObj,
                            `m/44'/60'/0'/0/${i}`,
                        )
                        addresses.push(wallet.address)
                    }

                    return {
                        url: 'public-address',
                        method: 'POST',
                        body: { addresses },
                    }
                } catch (error) {
                    throw new Error(
                        'Ошибка при получении адресов из сид-фразы.',
                    )
                }
            },
        }),
    }),
})

export const {
    useAddAddressesMutation,
    useDecryptWalletMutation,
    useGetAddressesFromSeedMutation,
} = walletsApi
