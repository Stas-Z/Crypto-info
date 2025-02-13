import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { IConfig } from '@/Config/configuration'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<IConfig>) => {
                return {
                    uri: configService.get<string>('dbUlr'),
                }
            },
        }),
    ],
})
export class DatabaseModule {}
