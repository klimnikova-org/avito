import { dataBaseOptions } from './data-source';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';

@Module({
    imports: [TypeOrmModule.forRoot(dataBaseOptions), AuthModule, UsersModule],
    controllers: [AppController],
})
export class AppModule {}
