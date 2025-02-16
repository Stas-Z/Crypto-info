import { JwtAuthGuard } from '@/Auth/guards/jwt-auth.guard'
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common'
import { TokensService } from './tokens.service'
import { CurrentUser } from '@/Auth/decorators/current-user.decarator'
import { UserDocument } from '@/Users/schema/user.schema'
import { Types } from 'mongoose'

@Controller('tokens')
@UseGuards(JwtAuthGuard)
export class TokensController {
    constructor(private readonly tokenService: TokensService) {}

    @Post()
    async createTokens(
        @CurrentUser() user: UserDocument,
        @Body('token') token: string,
    ) {
        return this.tokenService.createTokens(
            new Types.ObjectId(user._id),
            token,
        )
    }

    @Get()
    async getTokens(@CurrentUser() user: UserDocument) {
        return this.tokenService.getTokensByUser(new Types.ObjectId(user._id))
    }

    @Delete(':id')
    async deleteToken(@Param('id') id: string) {
        return this.tokenService.deleteToken(new Types.ObjectId(id))
    }
}
