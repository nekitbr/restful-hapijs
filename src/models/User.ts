import { Post } from './Post';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { sharedProps } from './SharedProps'
import { Accident } from './Accident';

export enum UserType {
    user = 'user',
    admin = 'admin'
}

@Entity({name: 'users', schema: process.env.POSTGRES_SCHEMA})
export class User extends sharedProps {
    constructor(firstName: string, email: string, role?: UserType) {
        super()

        this.firstName = firstName
        this.email = email
        this.role = role
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'first_name', nullable: false })
    firstName: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({default: UserType.user, enum: UserType, type: 'enum'})
    role: UserType;

    @OneToMany(() => Post, (post: Post) => post.user)
    posts: Array<Post>;

    // @OneToMany(() => Accident, (accident: Accident) => accident.user)
    // accidents: Array<Post>;
}
