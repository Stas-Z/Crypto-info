import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Types } from 'mongoose'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { IConfig } from '@/Config/configuration'
import { UsersService } from '@/Users/users.service'

import { TokenPayload } from '../types/token-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService<IConfig>,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Authentication,
            ]),
            secretOrKey: configService.get('secret'),
        })
    }

    async validate(payload: TokenPayload) {
        return this.usersService.findById(new Types.ObjectId(payload.userId))
    }
}
