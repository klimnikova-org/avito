import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserEntity } from './model/user.entitiy';
import { AppDataSource } from './../../data-source';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async create(dto: CreateUserDto): Promise<UserEntity> {
        const { name, phone, email, password } = dto;
        const qb = await AppDataSource.getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .orWhere('user.phone = :phone', { phone });

        const user = qb.getOne();

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
        newUser.password = password;
        newUser.phone = phone;

        const errors = await validate(newUser);
        if (errors.length > 0) {
            throw new HttpException(
                { message: 'Некорректные введенные данные.', errors },
                HttpStatus.BAD_REQUEST,
            );
        } else {
            const savedUser = await this.userRepository.save(newUser);
            return savedUser;
        }
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            const errors = 'User not found';
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    async update(
        id: number,
        newUser: UpdateUserDto,
    ): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            const errors = 'User not found';
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }
        const updateUser = { ...user, ...newUser };
        return await this.userRepository.save(updateUser);
    }

    async remove(id: number) {
        return await this.userRepository.delete({ id });
    }
}
