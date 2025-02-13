import { Injectable, NotFoundException } from '@nestjs/common'
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

    async createAddress(
        userId: Types.ObjectId,
        address: string,
        currency: string,
    ) {
        const newAddress = new this.addressModel({
            address,
            currency,
            user: userId,
        })
        return newAddress.save()
    }

    async getAddressByUser(userId: Types.ObjectId) {
        return this.addressModel.find({ user: userId })
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
