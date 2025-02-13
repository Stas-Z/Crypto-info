import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { DataHasherService } from '@/utils/data-hasher.service'

import { User, UserSchema } from './schema/user.schema'
import { UsersController } from './user.controller'
import { UsersService } from './users.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule,
    ],
    providers: [UsersService, DataHasherService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
