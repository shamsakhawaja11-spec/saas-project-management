import { Entity,Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('workspaces')
export class Workspace{
    @PrimaryGeneratedColumn('uuid')
    id!:string;
    
    @Column({type:"varchar",length:100})
    name!:string;

    @Column({type:"varchar",length:50, nullable:true})
    description!:string;

    @ManyToOne(()=>User,(user)=>user.workspace)
    owner!:User;

    @Column({type:'uuid'})
    ownerId!:string;

    @CreateDateColumn()
    createdAt!:Date;

    @UpdateDateColumn()
    updatedAt!:Date;
}