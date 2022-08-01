import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { sharedProps } from './SharedProps'
import User from './User';

@Entity({name: 'accidents', schema: process.env.POSTGRES_SCHEMA})
export default class Accident extends sharedProps {
    constructor(title: string, description: string, vehiclePlate: string, thirdParty: User, createdByUser: User) {
        super()

        this.title = title
        this.description = description
        this.vehiclePlate = vehiclePlate
        this.thirdParty = thirdParty
        this.createdByUser = createdByUser
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    description: string;

    @Column()
    vehiclePlate: string;

    @ManyToOne(() => User, (user: User) => user.createdAccidents)
    @JoinColumn()
    createdByUser: User;

    @ManyToOne(() => User, (user: User) => user.participatedAccidents)
    @JoinColumn()
    thirdParty: User;
}
