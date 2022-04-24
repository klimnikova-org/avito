import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserEntity } from './model/user.entitiy';
import { SALT_ROUNDS } from 'src/constants';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {}

    async create(dto: CreateUserDto): Promise<UserEntity> {
        const { name, phone, email, password } = dto;
        const user = await this.usersRepository.findOne({
            where: [{ phone }, { email }],
        });

        if (user) {
            const errors = 'У вас уже есть аккаунт.';
            throw new HttpException(
                { message: 'Некорректные данные', errors },
                HttpStatus.BAD_REQUEST,
            );
        }

        const newUser = new UserEntity();
        newUser.email = email;
        newUser.name = name;
        newUser.password = await hash(password, SALT_ROUNDS);
        newUser.phone = phone;

        return this.usersRepository.save(newUser);
    }

    async findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<UserEntity | null> {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            const errors = 'Пользователь не найден';
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    async findOneByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.usersRepository.findOne({ where: { email } });

        return user;
    }

    async update(
        id: number,
        newUser: UpdateUserDto,
    ): Promise<UserEntity | null> {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            const errors = 'User not found';
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }
        const updateUser = { ...user, ...newUser };
        return await this.usersRepository.save(updateUser);
    }

    async remove(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            const errors = 'Пользователь не найден';
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }

        return await this.usersRepository.remove(user);
    }
}
