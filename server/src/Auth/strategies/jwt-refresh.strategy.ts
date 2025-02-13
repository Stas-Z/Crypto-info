import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Types } from 'mongoose'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { IConfig } from '@/Config/configuration'

import { AuthService } from '../auth.service'
import { TokenPayload } from '../types/token-payload.interface'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        configService: ConfigService<IConfig>,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Refresh,
            ]),
            secretOrKey: configService.get('refresh'),
            passReqToCallback: true,
        })
    }

    async validate(request: Request, payload: TokenPayload) {
        return this.authService.verifyUserRefreshToken(
            request.cookies?.Refresh,
            new Types.ObjectId(payload.userId),
        )
    }
}
