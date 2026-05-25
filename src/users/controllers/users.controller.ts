import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserResponseDto } from "../dto/user-response.dto";

@Controller('users')
export class UsersController{
    constructor(private usersService:UsersService){}
    
    @Post('signup')
    async signup(@Body() createUserDto:CreateUserDto):Promise<UserResponseDto>{
        return await this.usersService.createUser(createUserDto);
    }
    @Get(':id')
    async getUser(@Param('id') id:string):Promise<UserResponseDto>{
        return this.usersService.findById(id);
    }
}
