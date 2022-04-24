import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return req.user;
    }
}
