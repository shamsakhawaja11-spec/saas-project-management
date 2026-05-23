import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/services/users.service";
import { LoginDto } from "../users/dtos/login.dto";
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    login(logindto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map