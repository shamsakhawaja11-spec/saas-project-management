import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";
import { User } from "../../users/entities/user.entity";


@Entity('time_entries')
export class TimeEntry{
    @PrimaryGeneratedColumn('uuid')
    id!:string;
    @Column({type:'int'})
    minutes!:number;
    @Column({type:'varchar',nullable:true})
    description?:string;
    @ManyToOne(()=>Task,(tasks)=>tasks.timeEntries,{onDelete:'CASCADE'})
    @JoinColumn({name:'taskId'})
    task!:Task;
    @Column({name:'taskId'})
    taskId!:string;
    @ManyToOne(()=>User,(user)=>user.timeEntries,{onDelete:'CASCADE'})
    @JoinColumn({name:'userId'})
    user!:User;
    @Column({name:'userId'})  
    userId!:string;
    @Column({type:'date'})
    logDate!:string;
    @CreateDateColumn()
    createdAt!:Date;
    @UpdateDateColumn()
    updateAt!:Date;
}