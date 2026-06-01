import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Workspace } from "../../workspaces/entities/workspace.entity";
import { Board } from "../../boards/entities/board.entity";

@Entity('projects')
export class Project{
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({length:100})
    name!:string;

    @Column({type:"varchar",length:123,nullable:true})
    description!:string;

    @OneToMany(()=>Board,(board)=>board.project,{onDelete:'CASCADE'})
    boards!:Board[];

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