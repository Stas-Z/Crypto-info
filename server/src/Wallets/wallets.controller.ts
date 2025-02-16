import { Controller, Post, Body } from '@nestjs/common'
import { WalletsService } from './wallets.service'
import { GetBalanceDto } from './dto/get-balance.dto'

@Controller('wallets')
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    @Post('balance')
    async getBalance(@Body() dto: GetBalanceDto) {
        return this.walletsService.getBalance(dto)
    }
}
