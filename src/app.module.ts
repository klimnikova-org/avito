import { dataBaseOptions } from './data-source';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({ ...dataBaseOptions, synchronize: false }),
        UsersModule,
    ],
})
export class AppModule {}
