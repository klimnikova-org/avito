import {
    Body,
    Controller,
    Get,
    Delete,
    Patch,
    Param,
    Post,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private userService: UserService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        this.userService.create(createUserDto);
    }

    @Patch()
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        this.userService.update(id, updateUserDto);
    }

    @Delete()
    remove(@Param('id') id: string) {
        this.userService.remove(id);
    }
}
