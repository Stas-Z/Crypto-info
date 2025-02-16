import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Token, TokenDocument } from './schema/tokens.schema'
import { Model, Types } from 'mongoose'

@Injectable()
export class TokensService {
    constructor(
        @InjectModel(Token.name)
        private tokenModel: Model<TokenDocument>,
    ) {}

    async createTokens(userId: Types.ObjectId, token: string) {
        const existingToken = await this.tokenModel.find({
            userId,
            token,
        })

        if (existingToken.length) {
            await this.tokenModel.deleteOne({
                userId: new Types.ObjectId(userId),
                token,
            })
            return existingToken
        }

        const newToken = new this.tokenModel({
            token,
            userId,
        })

        return await newToken.save()
    }

    async getTokensByUser(userId: Types.ObjectId) {
        return this.tokenModel.find({ userId })
    }

    async getTokenById(id: Types.ObjectId) {
        const token = await this.tokenModel.findById(id)
        if (!token) {
            throw new NotFoundException('Token not found')
        }
        return token
    }

    async deleteToken(id: Types.ObjectId) {
        return this.tokenModel.findByIdAndDelete(id)
    }
}
