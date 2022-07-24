import { Post } from './Post';
import { User } from './User';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { sharedProps } from './SharedProps'

export enum UserType {
    user = 'user',
    admin = 'admin'
}

@Entity({name: 'accidents', schema: process.env.POSTGRES_SCHEMA})
export class Accident extends sharedProps {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    description: string;

    // clienteId: string - FK,
    // terceiroId: string - FK,
    // veiculoId: string

    @ManyToOne(() => User, (user: User) => user.accidents)
    accidents: User

    @ManyToOne(() => User, (user: User) => user.posts)
    user: User;

    @OneToMany(() => Post, (post: Post) => post.user)
    posts: Array<Post>;
}
