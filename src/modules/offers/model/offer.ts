import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { UserEntity } from '../../users/model/user.entitiy';

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @ManyToOne(() => UserEntity, (user) => user.offers)
    user: UserEntity;
}
