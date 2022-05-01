import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Offer } from '../../offers/model/offer';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;

    @Column({ length: 11 })
    phone: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 100 })
    // @Exclude()
    password: string;

    @OneToMany(() => Offer, (offer) => offer.user)
    offers: Offer[];
}
