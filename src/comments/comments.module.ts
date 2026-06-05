import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { CommentsController } from "./controllers/comments.controller";
import { CommentsRepository } from "./repositories/comments.repository";
import { CommentsService } from "./services/comments.service";

@Module({
    imports:[TypeOrmModule.forFeature([Comment])],
    controllers:[CommentsController],
    providers:[CommentsRepository,CommentsService],
    exports:[CommentsService],
})
export class CommentsModule{}