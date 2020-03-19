import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    user_uuid: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    level: number;

    @Column()
    created_at: number;

    @Column()
    updated_at: number;

}