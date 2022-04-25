import { RefreshPayload } from './types/refresh-payload.type';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Injectable, ForbiddenException } from '@nestjs/common';

import { UserEntity } from './../users/model/user.entitiy';
import { UsersService } from '../users/users.service';
import { ACCESS_SECRET, REFRESH_SECRET } from './constants';
import { Tokens } from './types/tokens.types';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private refreshTokenService: RefreshTokenService,
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
        await this.refreshTokenService.updateRefreshToken(
            user,
            tokens.refreshToken,
        );
        return tokens;
    }

    async logout(user: UserEntity) {
        const result = await this.refreshTokenService.expireRefreshToken(
            user.id,
        );
        console.log(result);
    }

    async refreshTokens(payload: RefreshPayload): Promise<Tokens> {
        const tokenData = await this.refreshTokenService.findTokenById(
            payload.id,
        );

        if (!tokenData || Number(tokenData?.expires) < new Date().getTime()) {
            throw new ForbiddenException('Access Denied');
        }

        const rtMatches = await compare(payload.refreshToken, tokenData.hash);
        if (!rtMatches) {
            throw new ForbiddenException('Access Denied');
        }

        const tokens = await this.getTokens(payload.id, payload.email);

        await this.refreshTokenService.updateRefreshToken(
            { id: payload.id, email: payload.email },
            tokens.refreshToken,
        );

        return tokens;
    }

    async getTokens(userId: number, email: string): Promise<Tokens> {
        const jwtPayload = {
            sub: userId,
            email: email,
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
