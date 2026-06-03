import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardsRepository } from "../repositories";
import { CreateBoardDto, UpdateBoardDto } from "../dto";
import { Board } from "../entities/board.entity";

@Injectable()
export class BoardsService{
    constructor(private boardsRepository:BoardsRepository){}
    
    async create(createBoardDto:CreateBoardDto,projectId:string):Promise<Board>{
        const board= this.boardsRepository.create({...createBoardDto,projectId});
        return this.boardsRepository.save(board);
    }
    async findAll(projectId:string):Promise<Board[]>{
        return await this.boardsRepository.findByProjectId(projectId);
    }
    async findOne(boardId:string,projectId:string):Promise<Board>{
        const board=await this.boardsRepository.findByIdAndProjectId(boardId,projectId);
        if(!board){
            throw new NotFoundException('not found');
        }
        return board;
    }
    async update(boardId:string,projectId:string,updateBoardDto:UpdateBoardDto):Promise<Board>{
        await this.findOne(boardId,projectId);
        await this.boardsRepository.update(boardId,updateBoardDto);
        return this.findOne(boardId,projectId);
    }
    async remove(boardId:string,projectId:string):Promise<void>{
        await this.findOne(boardId,projectId);
        await this.boardsRepository.delete(boardId);
    }
}