import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Workspace } from "../../workspaces/entities/workspace.entity";

@Entity('projects')
export class Project{
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({length:100})
    name!:string;

    @Column({type:"varchar",length:123,nullable:true})
    description!:string;

    @ManyToOne(()=>Workspace,(Workspace)=>Workspace.projects)
    @JoinColumn({name:'workspaceId'})
    workspace!:Workspace;

    @Column({type:'uuid'})
    workspaceId!:string;

    @CreateDateColumn()
    createdAt!:Date;
    
    @UpdateDateColumn()
    updatedAt!:Date;
}