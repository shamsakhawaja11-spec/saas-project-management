import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";
import { Task } from "../../tasks/entities/task.entity";

@Entity('boards')
export class Board{
    @PrimaryGeneratedColumn('uuid')
    id!:string;
    @Column({length:100})
    name!:string;
    @Column({type:'varchar',length:100,nullable:true})
    description!:string;
    @ManyToOne(()=>Project,(project)=>project.boards)
    @JoinColumn({name:'projectId'})
    project!:Project;
    @Column({type:'uuid'})
    projectId!:string
    @CreateDateColumn()
    createdAt!:Date;
    @UpdateDateColumn()
    updatedAt!:Date;
    @OneToMany(()=>Task,(task)=>task.board)
    tasks!:Task[];
}