import { AccessGuard } from './guards/access.guard';
import { RefreshGuard } from './guards/refresh-guard';
import {
    Controller,
    Get,
    Request,
    Post,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(RefreshGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        return this.authService.refreshTokens(req.user);
    }

    @UseGuards(AccessGuard)
    @Get('logout')
    async logout(@Request() req) {
        return this.authService.logout(req.user);
    }
}
