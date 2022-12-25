import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/request/create-user-request.dto';
import { UserResponse } from './dto/response/user-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @Post()
    async createUser(
        @Body() createUserRequest: CreateUserRequest): Promise<UserResponse> {
        return this.userService.createUser(createUserRequest);
    }
}
