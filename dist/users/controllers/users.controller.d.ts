import { UsersService } from "../services/users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserResponseDto } from "../dto/user-response.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    signup(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    getUser(id: string): Promise<UserResponseDto>;
}
//# sourceMappingURL=users.controller.d.ts.map