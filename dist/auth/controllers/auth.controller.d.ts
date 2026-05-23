import { AuthService } from '../services/auth.service';
import { LoginDto } from '../../users/dtos/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map