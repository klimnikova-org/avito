import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { RefreshTokenEntity } from './model/refresh-token.entity';
import { RefreshTokenService } from './refresh-token.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RefreshTokenEntity]),
        JwtModule.register({}),
    ],
    providers: [RefreshTokenService],
    exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
