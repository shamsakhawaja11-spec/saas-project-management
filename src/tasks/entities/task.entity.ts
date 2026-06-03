import { JoinColumn,Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Board } from "../../boards/entities/board.entity";

export enum TaskStatus{
    TODO='todo',
    IN_PROGRESS='in_progress',
    DONE='done',
}
export enum TaskPriority{   
    LOW='low',
    MEDIUM='medium',
    HIGH='high',
}
@Entity('tasks')
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id!:string;
    @Column({type:'varchar',length:100})
    name!:string;
    @Column({nullable:true})
    description?:string;
    @Column({type:'enum',enum:TaskStatus,default:TaskStatus.TODO})
    status!:TaskStatus;
    @Column({type:'enum',enum:TaskPriority,default:TaskPriority.MEDIUM})
    priority!:TaskPriority;
    @CreateDateColumn()
    createdAt!:Date;
    @UpdateDateColumn()
    updatedAt!:Date;
    @Column({type:'timestamp',nullable:true})
    dueDate?:Date;
    @ManyToOne(()=>Board,(board)=>board.task)
    @JoinColumn({name:'boardId'})
    board!:Board;
    @Column({type:'uuid'})
    boardId!:string;

}