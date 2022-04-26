import { RefreshPayload } from './types/refresh-payload.type';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserEntity } from './../users/model/user.entitiy';
import { UsersService } from '../users/users.service';
import { ACCESS_SECRET, REFRESH_SECRET } from './constants';
import { Tokens } from './types/tokens.types';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private tokensService: TokensService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user) {
            const isMatch = await compare(pass, user.password);
            if (isMatch) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }

        return null;
    }

    async login(user: UserEntity) {
        const tokens = await this.getTokens(user.id, user.email);

        await this.tokensService.updateTokens({
            user,
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
        });
        return tokens;
    }

    async logout(user: UserEntity & { sessionId: string }) {
        await this.tokensService.expireTokens(user.sessionId).catch((err) => {
            throw new ForbiddenException(err);
        });
    }

    async refreshTokens(payload: RefreshPayload): Promise<Tokens> {
        const tokenData = await this.tokensService.findTokenById(
            payload.sessionId,
        );

        if (!tokenData || tokenData.isRevoked) {
            throw new ForbiddenException('Access Denied');
        }

        // const rtMatches = await compare(
        //     payload.refreshToken,
        //     tokenData.hashRefresh,
        // );
        const rtMatches = payload.refreshToken === tokenData.hashRefresh;

        if (!rtMatches) {
            throw new ForbiddenException('Access Denied');
        }

        const tokens = await this.getTokens(
            payload.id,
            payload.email,
            payload.sessionId,
        );

        await this.tokensService.updateTokens({
            user: { id: payload.id, email: payload.email },
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
        });

        return tokens;
    }

    async getTokens(
        userId: number,
        email: string,
        sessionId?: string,
    ): Promise<Tokens> {
        const jwtPayload = {
            sub: userId,
            email: email,
            sessionId: sessionId || uuidv4(),
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: ACCESS_SECRET,
                expiresIn: '10m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: REFRESH_SECRET,
                expiresIn: '7d',
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
