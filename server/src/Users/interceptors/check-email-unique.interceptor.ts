import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'

import { UsersService } from '../users.service'

@Injectable()
export class CheckEmailUniqueInterceptor implements NestInterceptor {
    constructor(private readonly usersService: UsersService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<unknown>> {
        const request = context.switchToHttp().getRequest()

        try {
            const { email } = request.body

            if (!email) {
                throw new UnauthorizedException('Вы не ввели email!')
            }

            const existingUser = await this.usersService.findByEmail(
                email.toLowerCase(),
            )

            if (existingUser) {
                throw new BadRequestException('Такой email уже существует.')
            }

            return next.handle()
        } catch (e) {
            if (
                e instanceof BadRequestException ||
                e instanceof UnauthorizedException
            ) {
                throw e
            }
            console.error(e)
            throw new BadRequestException('Ошибка обработки запроса')
        }
    }
}
