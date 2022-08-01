import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { sharedProps } from './SharedProps'
import Accident from './Accident';
import File from './Files';

export enum UserType {
    user = 'user',
    admin = 'admin',
    thirdParty = 'third-party',
}

@Entity({name: 'users', schema: process.env.POSTGRES_SCHEMA})
export default class User extends sharedProps {
    constructor(firstName: string, lastName: string, email: string, cpf: string, thirdPartyRelation: Boolean, password: string, salt: string, role?: UserType) {
        super()

        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.cpf = cpf
        this.role = role
        this.thirdPartyRelation = thirdPartyRelation
        this.salt = salt
        this.password = password
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    firstName: string;

    @Column({nullable: false})
    lastName: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false, unique: true})
    cpf: string;

    @Column({default: UserType.user, enum: UserType, type: 'enum'})
    role: UserType;

    @Column({default: false})
    thirdPartyRelation: Boolean;

    @Column({nullable: true, select: false})
    salt: string;

    @Column({nullable: true, select: false})
    password: string;

    @OneToMany(() => File, (file: File) => file.user)
    files: Array<File>;

    @OneToMany(() => Accident, (accident: Accident) => accident.createdByUser)
    createdAccidents: Array<Accident>;

    @OneToMany(() => Accident, (accident: Accident) => accident.thirdParty)
    participatedAccidents: Array<Accident>;
}
