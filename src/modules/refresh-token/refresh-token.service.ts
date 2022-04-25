import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../users/model/user.entitiy';
import { RefreshTokenEntity } from './model/refresh-token.entity';
import { SALT_ROUNDS } from '../users/constants';

@Injectable()
export class RefreshTokenService {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
        private jwtService: JwtService,
    ) {}
    async updateRefreshToken(
        user: Partial<UserEntity>,
        token: string,
    ): Promise<RefreshTokenEntity> {
        const refreshToken = new RefreshTokenEntity();

        refreshToken.userId = user.id;
        const { exp } = this.jwtService.decode(token) as any;
        refreshToken.expires = exp.toString();
        refreshToken.hash = await hash(token, SALT_ROUNDS);

        return this.refreshTokenRepository.save(refreshToken);
    }

    async findTokenById(userId: number): Promise<RefreshTokenEntity | null> {
        return this.refreshTokenRepository.findOne({ where: { userId } });
    }

    async expireRefreshToken(userId: number) {
        const refreshToken = new RefreshTokenEntity();

        refreshToken.userId = userId;
        refreshToken.expires = new Date().getTime().toString();

        return this.refreshTokenRepository.save(refreshToken);
    }
}
