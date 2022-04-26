import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { Tokens } from './model/tokens';
import { TokensService } from './tokens.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tokens]), JwtModule.register({})],
    providers: [TokensService],
    exports: [TokensService],
})
export class TokensModule {}
