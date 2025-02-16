import { Module } from '@nestjs/common'
import { WalletsController } from './wallets.controller'
import { WalletsService } from './wallets.service'
import { HttpModule } from '@nestjs/axios'
import { TokenPricesService } from '@/Tokens/token-prices.service'
import { TokensModule } from '@/Tokens/tokens.module'

@Module({
    imports: [TokensModule, HttpModule],
    controllers: [WalletsController],
    providers: [WalletsService, TokenPricesService],
})
export class WalletsModule {}
