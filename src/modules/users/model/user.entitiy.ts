import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @IsNotEmpty()
    name: string;

    @Column()
    @IsInt()
    phone: number;

    @Column({ length: 100 })
    @IsEmail()
    email: string;

    @Column({ length: 100 })
    password: string;
}
