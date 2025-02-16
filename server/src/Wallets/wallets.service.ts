import { Injectable, BadRequestException } from '@nestjs/common'
import { GetBalanceDto } from './dto/get-balance.dto'
import { ethers, JsonRpcProvider, Contract } from 'ethers'
import { ConfigService } from '@nestjs/config'
import { IConfig } from '@/Config/configuration'
import { TokenBalance } from './interfaces/wallets.service'
import { TokenPricesService } from '@/Tokens/token-prices.service'

@Injectable()
export class WalletsService {
    private provider: JsonRpcProvider

    constructor(
        private readonly configService: ConfigService<IConfig>,
        private readonly tokenPricesService: TokenPricesService,
    ) {
        const infuraUrl = this.configService.get<string>('INFURA_URL')
        this.provider = new JsonRpcProvider(infuraUrl)
    }

    private async getDecimals(token: {
        symbol: string
        contractAddress: string | null
    }) {
        if (token.contractAddress) {
            const contract = new Contract(
                token.contractAddress,
                ['function decimals() view returns (uint8)'],
                this.provider,
            )
            try {
                const decimals = await contract.decimals()
                return decimals
            } catch (error) {
                console.error(
                    `Error fetching decimals for ${token.symbol}:`,
                    error,
                )
                return null
            }
        } else {
            return 18
        }
    }

    async getBalance(dto: GetBalanceDto) {
        const { address, tokens } = dto

        if (!ethers.isAddress(address)) {
            throw new BadRequestException('Invalid Ethereum address')
        }

        const ethBalance = await this.provider.getBalance(address)
        const ethPriceInUSD = await this.tokenPricesService.getTokenPrices([
            'eth',
        ])

        const balances: TokenBalance[] = [
            {
                name: 'ETH',
                balance: ethers.formatEther(ethBalance),
                balanceInUSD:
                    parseFloat(ethers.formatEther(ethBalance)) *
                    ethPriceInUSD['eth'],
            },
        ]

        if (tokens && tokens.length > 0) {
            const tokenSymbols = tokens.map((token) =>
                token.symbol.toLowerCase(),
            )

            const tokenPrices =
                await this.tokenPricesService.getTokenPrices(tokenSymbols)

            for (const token of tokens) {
                const contract = new Contract(
                    token.contractAddress,
                    ['function balanceOf(address) view returns (uint256)'],
                    this.provider,
                )

                try {
                    const tokenBalance = await contract.balanceOf(address)

                    const tokenPriceInUSD =
                        tokenPrices[token.symbol.toLowerCase()] || 0

                    const tokenDecimals = await this.getDecimals(token)

                    const formattedBalance = ethers.formatUnits(
                        tokenBalance,
                        tokenDecimals ?? 18,
                    )

                    balances.push({
                        name: token.name,
                        balance: formattedBalance,
                        balanceInUSD:
                            parseFloat(formattedBalance) * tokenPriceInUSD,
                    })
                } catch (error) {
                    console.error(`Failed to fetch balance for ${token.symbol}`)
                }
            }
        }

        return balances
    }
}
