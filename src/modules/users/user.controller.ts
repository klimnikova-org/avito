import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import {
    Body,
    Controller,
    Get,
    Delete,
    Patch,
    Param,
    Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    findAll(): string {
        return 'This action returns all users';
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} user`;
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    @Patch()
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    @Delete()
    remove(@Param('id') id: string) {
        return `This action delete a ${id} user`;
    }
}
