import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/entities/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly prismaService;
    private readonly configService;
    private readonly logger;
    constructor(userService: UserService, jwtService: JwtService, prismaService: PrismaService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<{
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        avatar: string;
        id: string;
        role: import("generated/prisma/client").Role[];
        age: number;
        address: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: {
            token: string;
            expires: Date;
            userId: string;
        };
    }>;
    logout(refreshToken: string): Promise<boolean>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: {
            token: string;
            expires: Date;
            userId: string;
        };
    } | undefined>;
    private generateTokens;
    private getRefreshToken;
}
