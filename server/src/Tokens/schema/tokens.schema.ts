import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type TokenDocument = HydratedDocument<Token>

@Schema()
export class Token {
    @Prop({ required: true })
    token: string

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId
}

export const TokenSchema = SchemaFactory.createForClass(Token)
