import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { BoardsService } from "../services/boards.service";
import { CreateBoardDto, UpdateBoardDto } from "../dto";
import { ResponseBoardDto } from "../dto/board-response.dto";

@Controller('projects/:projectId/boards')
@UseGuards(JwtAuthGuard)
export class BoardsController{
    constructor(private boardsService:BoardsService){}

    @Post()
    async create(@Param('projectId') projectId:string,@Body()createBoardDto:CreateBoardDto):Promise<ResponseBoardDto>{
        return this.boardsService.create(createBoardDto,projectId);
    }
    @Get()
    async findAll(@Param('projectId')projectId:string):Promise<ResponseBoardDto[]>{
        return this.boardsService.findAll(projectId);
    }
    @Get(':boardId')
    async findOne(@Param('projectId') projectId:string,@Param('boardId')boardId:string):Promise<ResponseBoardDto>{
        return this.boardsService.findOne(boardId,projectId);
    }
    @Patch(':boardId')
    async update(@Param('projectId')projectId:string,@Param('boardId')boardId:string,@Body()updateBoardDto:UpdateBoardDto):Promise<ResponseBoardDto>{
        return this.boardsService.update(boardId,projectId,updateBoardDto);
    }
    @Delete(':boardId')
    async remove(@Param('boardId')boardId:string,@Param('projectId')projectId:string):Promise<void>{
        return this.boardsService.remove(boardId,projectId);
    }
}