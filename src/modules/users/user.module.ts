import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './model/user.entitiy';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [UserService],
    exports: [],
})
export class UserModule {}
