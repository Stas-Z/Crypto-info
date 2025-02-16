import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { WalletsService } from './wallets.service'
import { GetBalanceDto } from './dto/get-balance.dto'
import { JwtAuthGuard } from '@/Auth/guards/jwt-auth.guard'

@Controller('wallets')
@UseGuards(JwtAuthGuard)
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    @Post('balance')
    async getBalance(@Body() dto: GetBalanceDto) {
        return this.walletsService.getBalance(dto)
    }
}
