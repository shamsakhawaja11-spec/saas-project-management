import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";


export enum NotificationType{
    TASK_ASSIGNED='task_assigned',
    COMMENT_ADDED='comment_added',
    TASK_STATUS_CHANGED='task_status_changed',
    TASK_DUE_SOON='task_due_soon'
}
@Entity('notifications')
export class Notification{

    @PrimaryGeneratedColumn('uuid')
    id!:string;
    @Column({type:'enum',enum:NotificationType})
    type!:NotificationType;
    @Column({type:'varchar',length:250})
    message!:string;
    @Column({type:'boolean',default:false})
    isRead!:boolean;
    @Column({type:'jsonb',nullable:true})
    metaData?:Record<string,any>;
    @ManyToOne(()=>(User),(user)=>user.notifications,{onDelete:'CASCADE'})
    @JoinColumn({name:'userId'})
    user!:User;
    @Column({name:'userId'})
    userId!:string;
    @CreateDateColumn()
    createdAt!:Date;

}