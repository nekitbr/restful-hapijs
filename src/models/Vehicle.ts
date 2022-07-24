import { Post } from './Post';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { sharedProps } from './SharedProps'

export enum UserType {
    user = 'user',
    admin = 'admin'
}

@Entity({name: 'vehicles', schema: process.env.POSTGRES_SCHEMA})
export class Vehicle extends sharedProps {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    role: string;

    @Column({nullable: false})
    placa: string;

    @OneToMany(() => Post, (post: Post) => post.user)
    posts: Array<Post>;
}
