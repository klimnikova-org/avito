import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsInt()
    readonly phone: number;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}
