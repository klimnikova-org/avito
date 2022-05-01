import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OfferDto } from './dto/offer.dto';
import { UserEntity } from '../users/model/user.entitiy';
import { Offer } from './model/offer';

@Injectable()
export class OffersService {
    constructor(
        @InjectRepository(Offer)
        private readonly offersRepository: Repository<Offer>,
    ) {}

    async create(dto: OfferDto, user: UserEntity): Promise<Offer> {
        return this.offersRepository.save({ ...dto, user });
    }

    async findAllByUser(
        user: UserEntity & { sessionId: string },
    ): Promise<Offer[]> {
        const { sessionId, ...properUser } = user;
        return this.offersRepository.find({ where: { user: properUser } });
    }

    async findOne(id: number): Promise<Offer | null> {
        const offer = await this.offersRepository.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!offer) {
            const errors = 'Offer not found';
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }

        return offer;
    }

    async update(id: number, newOffer: OfferDto): Promise<Offer | null> {
        await this.offersRepository.update(id, newOffer);

        const updatedOffer = await this.offersRepository.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!updatedOffer) {
            const errors = 'Offer not found';
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }

        return updatedOffer;
    }

    async remove(id: number) {
        const deleteResponse = await this.offersRepository.delete(id);

        if (!deleteResponse) {
            const errors = 'Offer not found';
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }
    }
}
