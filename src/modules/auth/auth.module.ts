import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersModule } from './../users/users.module';
import { LocalStrategy, AccessStrategy, RefreshStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { TokensModule } from '../tokens/tokens.module';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        TokensModule,
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, AccessStrategy, RefreshStrategy],
    exports: [AuthService],
})
export class AuthModule {}
