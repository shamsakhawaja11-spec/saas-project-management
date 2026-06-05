import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CommentsRepository } from "../repositories/comments.repository";
import { CreateCommentDto, UpdateCommentDto } from "../dto";
import { Comment } from "../entities/comment.entity";

@Injectable()
export class CommentsService{
    constructor(private commentsRepository:CommentsRepository){}
    async create(authorId:string,createCommentDto:CreateCommentDto):Promise<Comment>{
        return await this.commentsRepository.createComment(authorId,createCommentDto);
    }
    async findAllByTask(taskId:string):Promise<Comment[]>{
        const comments=await this.commentsRepository.findAllByTask(taskId);
        if(comments.length==0){
            throw new NotFoundException('No comments found')
        }
        return comments;
    }
    async findById(commentId:string):Promise<Comment>{
        const comment=await this.commentsRepository.findById(commentId);
        if(!comment){
            throw new NotFoundException('not found');
        }
        return comment;
    }
    async update(commentId:string,updateCommentDto:UpdateCommentDto,userId:string):Promise<Comment>{
        const comment=await this.findById(commentId);
        if(comment?.authorId!==userId){
            throw new ForbiddenException('not found');
        }
        return await this.commentsRepository.updateComment(comment,updateCommentDto.content);
    }
    async remove(commentId:string,userId:string):Promise<void>{
        const comment=await this.findById(commentId);
        if(comment?.authorId!==userId){
            throw new ForbiddenException('Not found for this user');
        }
        this.commentsRepository.removeComment(commentId);
    }
}