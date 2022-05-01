import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Tokens {
    @PrimaryColumn({ unique: true })
    sessionId: string;

    @Column()
    userId: number;

    @Column({
        nullable: true,
    })
    isRevoked: boolean;

    @Column()
    hashRefresh: string;

    @Column()
    hashAccess: string;
}
