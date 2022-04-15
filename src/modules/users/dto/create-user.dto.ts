import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly phone: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}
