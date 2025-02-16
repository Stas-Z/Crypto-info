export interface PublicAddress {
    _id?: string
    userId?: string
    address: string
}

export interface Wallet {
    addresses: PublicAddress[]
}
