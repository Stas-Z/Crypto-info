import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PublicAddressController } from './public-address.controller'
import { PublicAddressService } from './public-address.service'
import {
    PublicAddress,
    PublicAddressSchema,
} from './schema/public-address.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PublicAddress.name, schema: PublicAddressSchema },
        ]),
    ],
    controllers: [PublicAddressController],
    providers: [PublicAddressService],
    exports: [PublicAddressService],
})
export class PublicAddressModule {}
