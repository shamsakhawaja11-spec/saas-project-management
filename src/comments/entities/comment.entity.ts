import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";
import { User } from "../../users/entities/user.entity";

@Entity('comments')
export class Comment{
    @PrimaryGeneratedColumn('uuid')
    id!:string;
    @Column({type:'text'})
    content!:string;
    @Column('uuid')
    taskId!:string;
    @ManyToOne(()=>Task,(task)=>task.comments,{onDelete:'CASCADE'})
    @JoinColumn({name:'taskId'})
    task!:Task;
    @Column({type:'uuid'})
    authorId!:string;
    @ManyToOne(()=>User,(user)=>user.comments,{onDelete:'CASCADE'})
    @JoinColumn({name:'authorId'})
    author!:User;
    @CreateDateColumn()
    createdAt!:Date;
    @UpdateDateColumn()
    updateAt!:Date;
}