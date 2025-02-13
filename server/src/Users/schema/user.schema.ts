import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ unique: true })
    email: string

    @Prop()
    password: string

    @Prop({ default: '' })
    refreshToken?: string

    @Prop({ default: false })
    isActive: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.password
        delete ret.refreshToken
        return ret
    },
})
