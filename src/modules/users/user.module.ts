import { Module } from '@nestjs/common';

import { UsersController } from './user.controller';

@Module({
    controllers: [UsersController],
    exports: [],
})
export class UserModule {}
