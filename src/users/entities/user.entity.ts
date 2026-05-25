import { Exclude } from "class-transformer";
import { Column,Entity,PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Workspace } from "../../workspaces/entities/workspace.entity";
@Entity('users')
export class User{
    
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({type:"varchar",length:200})
    name!:string;

    @Column({type:"varchar",unique:true,length:120})
    email!:string;

    @Exclude()
    @Column({type:"varchar",length:100})
    password!:string;

    @OneToMany(()=>Workspace,(Workspace)=>Workspace.owner)
    workspace!:Workspace;

    @CreateDateColumn()
    createdAt!:Date;

    @UpdateDateColumn()
    updatedAt!:Date;


}