import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { CacheableMemory } from 'cacheable'
import Keyv from 'keyv'
import * as cacheManager from 'cache-manager'

@Injectable()
export class TokenPricesService {
    private cache: cacheManager.Cache

    constructor(private readonly httpService: HttpService) {
        this.cache = cacheManager.createCache({
            stores: [
                new Keyv({
                    store: new CacheableMemory({ ttl: 300000 }),
                }),
            ],
        })
    }

    private async fetchPricesFromApi(
        ids: string,
    ): Promise<Record<string, { usd: number }>> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
                ),
            )

            return response.data
        } catch (error) {
            console.log('Error fetching prices:', error)
            throw new Error('Failed to fetch token prices')
        }
    }

    private async getFromCache(
        ids: string,
    ): Promise<Record<string, number> | null> {
        const cacheKey = `token_prices_${ids}`
        return this.cache.get<Record<string, number>>(cacheKey)
    }

    private async setToCache(ids: string, prices: Record<string, number>) {
        const cacheKey = `token_prices_${ids}`
        await this.cache.set(cacheKey, prices, 300000)
    }

    async getTokenPrices(symbols: string[]): Promise<Record<string, number>> {
        const symbolMap: Record<string, string> = {
            eth: 'ethereum',
            '1inch': '1inch',
            aave: 'aave',
            dai: 'dai',
            grt: 'the-graph',
            link: 'chainlink',
            tether: 'tether',
            uni: 'uniswap',
        }

        const ids = symbols
            .map((symbol) => symbolMap[symbol.toLowerCase()])
            .join(',')

        if (ids.length === 0) {
            throw new Error('No valid tokens found')
        }

        let cachedPrices = await this.getFromCache(ids)
        if (cachedPrices) {
            return cachedPrices
        }

        const prices = await this.fetchPricesFromApi(ids)

        const formattedPrices = Object.entries(prices).reduce(
            (acc, [key, value]) => {
                if (key === 'ethereum') {
                    acc['eth'] = value.usd
                } else {
                    acc[key] = value.usd
                }
                return acc
            },
            {} as Record<string, number>,
        )

        await this.setToCache(ids, formattedPrices)
        return formattedPrices
    }
}
