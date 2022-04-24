import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

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
}
