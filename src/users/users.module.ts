import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "./repositories/users.repository";
import { UsersService } from "./services/users.service";
import { User } from "./entities/user.entity";
import { UsersController } from "./controllers/users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository,UsersService],
  controllers:[UsersController],
  exports: [UsersService],

})
export class UsersModule {}