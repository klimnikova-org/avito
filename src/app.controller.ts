import { AccessGuard } from './modules/auth/guards/access.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
    @UseGuards(AccessGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
