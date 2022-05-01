import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataBaseOptions } from './data-source';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { TokensModule } from './modules/tokens/tokens.module';
import { OffersModule } from './modules/offers/offers.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(dataBaseOptions),
        AuthModule,
        UsersModule,
        TokensModule,
        OffersModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
