import { Token } from '../model/types/addWalletSchema'

export const staticTokens: Token[] = [
    {
        symbol: '1INCH',
        name: '1inch',
        image: 'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x111111111117dC0aa78b770fA6A738034120C302/logo.png',
        contractAddress: '0x111111111117dC0aa78b770fA6A738034120C302',
    },

    {
        symbol: 'AAVE',
        name: 'Aave',
        image: 'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png',
        contractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    },
    {
        symbol: 'DAI',
        name: 'Dai Stablecoin',
        image: 'https://coin-images.coingecko.com/coins/images/9956/large/Badge_Dai.png?1696509996',
        contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    },
    {
        symbol: 'GRT',
        name: 'The Graph',
        image: 'https://coin-images.coingecko.com/coins/images/13397/large/Graph_Token.png?1696513159',
        contractAddress: '0xc944E90C64B2c07662A292be6244BDf05Cda44a7',
    },
    {
        symbol: 'LINK',
        name: 'Chainlink',
        image: 'https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009',
        contractAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    },
    {
        symbol: 'Tether',
        name: 'USDT',
        image: 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661',
        contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    },
    {
        symbol: 'UNI',
        name: 'Uniswap',
        image: 'https://coin-images.coingecko.com/coins/images/12504/large/uniswap-logo.png?1720676669',
        contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    },
]
