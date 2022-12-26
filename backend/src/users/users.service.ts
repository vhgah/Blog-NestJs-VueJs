import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { CreateUserRequest } from './dto/request/create-user-request.dto';
import { UserResponse } from './dto/response/user-response.dto';
import { User } from './model/Users';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }
    async createUser(createUserRequest: CreateUserRequest): Promise<UserResponse> {
        await this.validateCreateUserRequest(createUserRequest);

        const user = await this.userRepository.insertOne({
            ...createUserRequest,
            password: await hash(createUserRequest.password, 10),
        });
        return this.buildResponse(user);
    }

    async validateUser(email: string, password: string): Promise<UserResponse> {
        const user = await this.userRepository.findOneByEmail(email);

        if (!user) {
            throw new NotFoundException(`User not found with email: ${email}`);
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is not correct for email ' + user.email);
        }

        return this.buildResponse(user);
    }

    async getUserById(userId: string): Promise<UserResponse> {
        const user = await this.userRepository.findOneById(userId);

        if (!user) {
            throw new NotFoundException('User not found with id: ' + userId);
        }

        return this.buildResponse(user);
    }

    private buildResponse(user: User): UserResponse {
        return {
            _id: user._id,
            email: user.email,
        }
    }

    private async validateCreateUserRequest(createUserRequest: CreateUserRequest): Promise<void> {
        const user = await this.userRepository.findOneByEmail(createUserRequest.email);
        if (user) {
            throw new BadRequestException("This email already exist.");
        }
    }
}
