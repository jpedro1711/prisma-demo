import {UserRole} from "@prisma/client";
import {IsEmail, IsEnum, IsNotEmpty, IsString} from "class-validator";
import { validate } from 'class-validator';

export class UserRegistrationRequest {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    userRole: UserRole

    constructor(email: string, password: string, fullname: string, userRole: UserRole) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.userRole = userRole;
    }

    async validate(): Promise<boolean> {
        const errors = await validate(this);
        return errors.length == 0;
    }
}