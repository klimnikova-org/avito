import {
    Body,
    Controller,
    Get,
    Delete,
    Patch,
    Param,
    Post,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get()
    async findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Patch()
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete()
    async remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
}
