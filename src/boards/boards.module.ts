import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entities/board.entity";
import { BoardsController } from "./controllers";
import { BoardsService } from "./services";
import { BoardsRepository } from "./repositories";

@Module({
    imports:[TypeOrmModule.forFeature([Board])],
    controllers:[BoardsController],
    providers:[BoardsService,BoardsRepository],
    exports:[BoardsService],
})
export class BoardModule{}