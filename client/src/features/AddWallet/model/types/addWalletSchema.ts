export interface AddWalletSchema {
    privateKey: string
    currentAddress: string
}

export interface Balance {
    name: string
    balance: string
    balanceInUSD: string
}

export interface Token {
    name: string
    contractAddress: string | null
    symbol: string
    image: string
    selected?: boolean
}
