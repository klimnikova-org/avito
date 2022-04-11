import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    private readonly users: User[] = [];

    create(user: CreateUserDto) {
        this.users.push({ ...user, id: uuidv4() });
    }

    findAll(): User[] {
        return this.users;
    }

    findOne(id: string): User {
        return this.users.find((it) => it.id === id);
    }

    update(id: string, newUser: UpdateUserDto) {
        this.users.map((it) => {
            it.id === id ? { ...it, ...newUser } : it;
        });
    }

    remove(id: string) {
        this.users.filter((it) => it.id !== id);
    }
}
