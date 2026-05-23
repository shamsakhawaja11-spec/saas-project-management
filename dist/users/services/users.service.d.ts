import { UsersRepository } from "../repositories/users.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserResponseDto } from "../dtos/user-response.dto";
import { User } from "../entities/user.entity";
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    createUser(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findById(id: string): Promise<UserResponseDto>;
    validateUser(email: string, password: string): Promise<User>;
}
//# sourceMappingURL=users.service.d.ts.map