import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type PublicAddressDocument = HydratedDocument<PublicAddress>

@Schema()
export class PublicAddress {
    @Prop({ required: true })
    address: string

    @Prop({ required: true })
    currency: string

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId
}

export const PublicAddressSchema = SchemaFactory.createForClass(PublicAddress)
