import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { IConfig } from './Config/configuration'

const start = async () => {
    try {
        const app = await NestFactory.create(AppModule)

        const configService = app.get(ConfigService<IConfig>)
        const port = configService.get('port')

        const isDev = configService.get('NODE_ENV') === 'development'

        app.enableCors({
            origin: isDev ? true : configService.get('clientUrl'),
            credentials: true,
        })
        app.use(cookieParser())
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true,
            }),
        )
        await app.listen(port, () =>
            console.log(`server started on PORT ${port}`),
        )
    } catch (e) {
        console.log(e)
    }
}

start()
