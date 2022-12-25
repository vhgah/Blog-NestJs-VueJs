import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { TokenPayLoad } from './token-payload'

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) { }

    async login(user: UserResponse, response: Response): Promise<void> {
        const tokenPayLoad: TokenPayLoad = {
            userId: user._id
        }
        const expires = new Date();
        expires.setSeconds(
            expires.getSeconds() + this.configService.get('JWT_EXPIRATION_TIME')
        );

        const token = this.jwtService.sign(tokenPayLoad);

        response.cookie('Authentication', token, {
            httpOnly: true,
            expires
        });
    }
}
