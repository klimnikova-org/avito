import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../users/model/user.entitiy';
import { Tokens } from './model/tokens';
import { SALT_ROUNDS } from '../users/constants';

type UpdateTokens = {
    user: Partial<UserEntity>;
    refreshToken: string;
    accessToken: string;
};

@Injectable()
export class TokensService {
    constructor(
        @InjectRepository(Tokens)
        private readonly tokenRepository: Repository<Tokens>,
        private jwtService: JwtService,
    ) {}
    async updateTokens({
        user,
        refreshToken,
        accessToken,
    }: UpdateTokens): Promise<Tokens> {
        const { sessionId } = this.jwtService.decode(refreshToken) as any;

        const sessionData = await this.tokenRepository.findOne({
            where: { sessionId },
        });
        const tokens = new Tokens();
        tokens.userId = user.id;
        // tokens.hashRefresh = await hash(refreshToken, SALT_ROUNDS);
        // tokens.hashAccess = await hash(accessToken, SALT_ROUNDS);
        tokens.hashRefresh = refreshToken;
        tokens.hashAccess = accessToken;

        tokens.sessionId = sessionId;

        const updateSession = {
            ...sessionData,
            ...tokens,
        };

        return this.tokenRepository.save(updateSession);
    }

    async findTokenById(sessionId: string): Promise<Tokens | null> {
        return this.tokenRepository.findOne({ where: { sessionId } });
    }

    async expireTokens(sessionId: string) {
        const sessionData = await this.tokenRepository.findOne({
            where: { sessionId },
        });

        if (!sessionData) {
            const errors = 'Access Denied';
            return Promise.reject(errors);
        }
        const updateSession = {
            ...sessionData,
            isRevoked: true,
        };

        return this.tokenRepository.save(updateSession);
    }
}
