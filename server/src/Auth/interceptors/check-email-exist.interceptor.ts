import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    NotFoundException,
} from '@nestjs/common'
import { Observable } from 'rxjs'

import { UsersService } from '@/Users/users.service'

@Injectable()
export class CheckEmailExistInterceptor implements NestInterceptor {
    constructor(private readonly usersService: UsersService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<unknown>> {
        const request = context.switchToHttp().getRequest()

        const { email } = request.body

        const existingUser = await this.usersService.findByEmail(
            email.toLowerCase(),
        )
        if (!existingUser) {
            throw new NotFoundException('Пользователь с таким email не найден.')
        }

        return next.handle()
    }
}
