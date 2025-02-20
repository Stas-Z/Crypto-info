import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { Types } from 'mongoose'

import { IConfig } from '@/Config/configuration'
import { UserDocument } from '@/Users/schema/user.schema'
import { UsersService } from '@/Users/users.service'
import { DataHasherService } from '@/utils/data-hasher.service'

import { TokenPayload } from './types/token-payload.interface'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly passwordHasher: DataHasherService,
        private readonly configService: ConfigService<IConfig>,
        private readonly jwtService: JwtService,
    ) {}

    async login(user: UserDocument, response: Response) {
        const expiresAccessToken = new Date(
            Date.now() + parseInt(this.configService.get<string>('exptime')),
        )
        const expiresRefreshToken = new Date(
            Date.now() + parseInt(this.configService.get<string>('exprefresh')),
        )

        const tokenPayload: TokenPayload = {
            userId: user._id.toString(),
        }
        const accesToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.get('secret'),
            expiresIn: `${this.configService.get<string>('exptime')}ms`,
        })
        const refreshToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.get('refresh'),
            expiresIn: `${this.configService.get<string>('exprefresh')}ms`,
        })

        await this.usersService.updateUser(user._id, {
            refreshToken: await this.passwordHasher.hashData(refreshToken),
        })

        response.cookie('Authentication', accesToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: expiresAccessToken,
        })
        response.cookie('Refresh', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: expiresRefreshToken,
        })

        return response.json({
            id: user._id,
            email: user.email,
        })
    }

    async verifyUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email)

        if (!user) {
            throw new NotFoundException('Пользователь с таким email не найден.')
        }

        const isPasswordValid = await this.passwordHasher.compareData(
            password,
            user.password,
        )

        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверный пароль.')
        }
        return user
    }

    async verifyUserRefreshToken(refreshToken: string, userId: Types.ObjectId) {
        try {
            const user = await this.usersService.findById(userId)
            const authenticated = await this.passwordHasher.compareData(
                refreshToken,
                user.refreshToken,
            )

            if (!authenticated) {
                throw new UnauthorizedException('Вы не авторизированны')
            }

            return user
        } catch (e) {
            throw new UnauthorizedException('Refresh токен не валидный')
        }
    }

    async logout(response: Response) {
        response.clearCookie('Authentication', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        response.clearCookie('Refresh', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        return response.json({ message: 'Successfully logged out' })
    }
}
