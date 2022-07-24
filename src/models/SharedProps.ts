import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export class sharedProps {
    @CreateDateColumn({name: 'created_at', type: 'date', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at', type: 'date', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date

    @DeleteDateColumn({name: 'deleted_at', type: 'date'})
    deletedAt: Date
}
