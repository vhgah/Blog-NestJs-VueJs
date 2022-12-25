import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserResponse } from "src/users/dto/response/user-response.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<UserResponse> {
        return this.userService.validateUser(email, password);
    }
}