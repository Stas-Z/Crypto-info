import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UsersModule } from '@/Users/user.module'
import { DataHasherService } from '@/utils/data-hasher.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [UsersModule, PassportModule, JwtModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        DataHasherService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshStrategy,
    ],
})
export class AuthModule {}
