import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import {
    PublicAddress,
    PublicAddressDocument,
} from './schema/public-address.schema'

@Injectable()
export class PublicAddressService {
    constructor(
        @InjectModel(PublicAddress.name)
        private addressModel: Model<PublicAddressDocument>,
    ) {}

    async createAddresses(userId: Types.ObjectId, addresses: string[]) {
        const existingAddresses = await this.addressModel
            .find({
                userId,
                address: { $in: addresses },
            })
            .select('address')

        const existingAddressSet = new Set(
            existingAddresses.map((addr) => addr.address),
        )

        const newAddresses = addresses.filter(
            (address) => !existingAddressSet.has(address),
        )

        if (newAddresses.length === 0) {
            throw new ConflictException('Адрес уже существуют в базе данных.')
        }

        const addressesToSave = newAddresses.map((address) => ({
            address,
            userId,
        }))

        return this.addressModel.insertMany(addressesToSave)
    }

    async getAddressByUser(userId: Types.ObjectId) {
        return this.addressModel.find({ userId })
    }

    async getAddressById(id: Types.ObjectId) {
        const address = await this.addressModel.findById(id)
        if (!address) {
            throw new NotFoundException('Address not found')
        }
        return address
    }

    async deleteAddress(id: Types.ObjectId) {
        return this.addressModel.findByIdAndDelete(id)
    }
}
