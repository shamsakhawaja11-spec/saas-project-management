import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Comment } from "../entities/comment.entity";
import { CreateCommentDto } from "../dto";

@Injectable()
export class CommentsRepository extends Repository<Comment>{
    constructor(dataSource:DataSource){
        super(Comment,dataSource.createEntityManager());
    }
    async createComment(authorId:string,createCommentDto:CreateCommentDto):Promise<Comment>{
        const comment=this.create({...createCommentDto,authorId});
        return await this.save(comment);
    }
    async findAllByTask(taskId:string):Promise<Comment[]>{
        return await this.find({where:{taskId},order:{createdAt:'ASC'},
        });
    }
    async findById(id:string):Promise<Comment|null>{
        return await this.findOne({where:{id}});
    }
    async updateComment(comment:Comment,content:string){
        comment.content=content;
        await this.save(comment);
    }
    async removeComment(id:string):Promise<void>{
        await this.delete(id);
    }
}