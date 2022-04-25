import { RefreshStrategy } from './strategies/refresh.strategy';
import { AuthController } from './auth.controller';
import { RefreshTokenModule } from '../refresh-token/refresh-tokens.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersModule } from './../users/users.module';
import { LocalStrategy } from './local.strategy';
import { AccessStrategy } from './strategies/access.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        RefreshTokenModule,
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, AccessStrategy, RefreshStrategy],
    exports: [AuthService],
})
export class AuthModule {}
