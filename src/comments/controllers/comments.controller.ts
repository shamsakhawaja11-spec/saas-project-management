import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { CommentsService } from "../services/comments.service";
import { CreateCommentDto, UpdateCommentDto, ResponseCommentDto } from "../dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  async create(@Request() req: any, @Body() createCommentDto: CreateCommentDto): Promise<ResponseCommentDto> {
    return this.commentsService.create(req.user.sub, createCommentDto);
  }

  @Get('task/:taskId')
  async findAllByTask(@Param('taskId') taskId: string): Promise<ResponseCommentDto[]> {
    return this.commentsService.findAllByTask(taskId);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseCommentDto> {
    return this.commentsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Request() req: any): Promise<ResponseCommentDto> {
    return this.commentsService.update(id, updateCommentDto, req.user.sub);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any): Promise<void> {
    await this.commentsService.remove(id, req.user.sub);
  }
}