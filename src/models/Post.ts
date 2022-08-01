import User from "./User";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { sharedProps } from './SharedProps'

@Entity({ name: 'posts', schema: process.env.POSTGRES_SCHEMA })
export default class Post extends sharedProps {
    constructor(body: string, user: User ){
        super()
        this.body = body
        this.user = user
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    body: string;

    @ManyToOne(() => User, (user: User) => user.posts)
    user: User;
}