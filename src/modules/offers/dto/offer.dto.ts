import { IsNotEmpty } from 'class-validator';

export class OfferDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly price: number;
}
