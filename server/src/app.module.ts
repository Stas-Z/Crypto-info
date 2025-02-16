import { Module } from '@nestjs/common'

import { AuthModule } from './Auth/auth.module'
import { MyConfigModule } from './Config/config.module'
import { DatabaseModule } from './Database/database.module'
import { PublicAddressModule } from './Public-address/public-address.module'
import { UsersModule } from './Users/user.module'
import { TokensModule } from './Tokens/tokens.module'
import { WalletsModule } from './Wallets/wallets.module'

@Module({
    imports: [
        MyConfigModule,
        DatabaseModule,
        UsersModule,
        AuthModule,
        PublicAddressModule,
        TokensModule,
        WalletsModule,
    ],
})
export class AppModule {}
