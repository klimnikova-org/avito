import { dataBaseOptions } from './data-source';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forRoot(dataBaseOptions), UsersModule, AuthModule],
})
export class AppModule {}
