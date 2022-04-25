import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class RefreshTokenEntity {
    @PrimaryColumn()
    userId: number;

    @Column()
    expires: string | null;

    @Column()
    hash: string | null;
}
