import { dataBaseOptions } from './data-source';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/users/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({ ...dataBaseOptions, synchronize: false }),
        UserModule,
    ],
})
export class AppModule {}
