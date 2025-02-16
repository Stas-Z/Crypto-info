import { Module } from '@nestjs/common'
import { TokensController } from './tokens.controller'
import { TokensService } from './tokens.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Token, TokenSchema } from './schema/tokens.schema'
import { TokenPricesService } from './token-prices.service'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
        HttpModule,
    ],
    controllers: [TokensController],
    providers: [TokensService, TokenPricesService],
    exports: [TokensService, TokenPricesService],
})
export class TokensModule {}
