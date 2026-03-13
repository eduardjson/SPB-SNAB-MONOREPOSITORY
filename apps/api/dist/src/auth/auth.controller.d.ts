import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        avatar: string;
        id: string;
        role: import("../../generated/prisma/enums").Role[];
        age: number;
        address: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto, res: Response): Promise<void>;
    logout(refreshToken: string, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshTokens(refreshToken: string, res: Response): Promise<void>;
    private setRefreshTokenToCookies;
}
