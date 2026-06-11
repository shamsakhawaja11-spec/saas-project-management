import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UserResponseDto } from "../dto/user-response.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findById(id);
  }
}