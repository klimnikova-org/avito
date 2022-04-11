import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsInt()
    phone: number;

    @IsEmail()
    email: string;
}
