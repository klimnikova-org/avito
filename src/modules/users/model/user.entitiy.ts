import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
    password: string;
}
