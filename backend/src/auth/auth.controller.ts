import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/current-user.decorators';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @CurrentUser() user: UserResponse,
        @Res({ passthrough: true }) response: Response
    ): Promise<void> {
        const token = await this.authService.login(user, response);
        response.send({
            ...user, 
            token: token
        });
    }

    @Post('logout')
    async logout(
        @Res({ passthrough: true }) response: Response
    ) {
        await this.authService.logout(response);
    }
}
