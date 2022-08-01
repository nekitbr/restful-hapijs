import User from "./User";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { sharedProps } from './SharedProps'

@Entity({ name: 'files', schema: process.env.POSTGRES_SCHEMA })
export default class File extends sharedProps {
    constructor(size: number, fileName: string, key: string, path: string,){
        super()

        this.size = size
        this.fileName = fileName
        this.key = key
        this.path = path
    }
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    size: number;

    @Column()
    fileName: string;

    @Column({nullable: false})
    key: string;

    @Column({nullable: false})
    path: string;

    @ManyToOne(() => User, (user: User) => user.files)
    user: User;
}
