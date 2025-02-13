import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common'
import { Types } from 'mongoose'

import { CurrentUser } from '@/Auth/decorators/current-user.decarator'
import { JwtAuthGuard } from '@/Auth/guards/jwt-auth.guard'
import { UserDocument } from '@/Users/schema/user.schema'

import { PublicAddressService } from './public-address.service'

@Controller('public-address')
@UseGuards(JwtAuthGuard)
export class PublicAddressController {
    constructor(private readonly addressService: PublicAddressService) {}

    @Post()
    async createAddress(
        @CurrentUser() user: UserDocument,
        @Body('address') address: string,
        @Body('currency') currency: string,
    ) {
        return this.addressService.createAddress(
            new Types.ObjectId(user._id),
            address,
            currency,
        )
    }

    @Get()
    async getAddress(@CurrentUser() user: UserDocument) {
        return this.addressService.getAddressByUser(
            new Types.ObjectId(user._id),
        )
    }

    @Delete(':id')
    async deleteAddress(@Param('id') id: string) {
        return this.addressService.deleteAddress(new Types.ObjectId(id))
    }
}
