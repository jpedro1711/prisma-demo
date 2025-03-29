import {IsString, IsNotEmpty, IsEmail, IsEnum} from 'class-validator';
import { validate } from 'class-validator';
import {UserRole} from "@prisma/client";

export class User {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    userRole: UserRole;

    constructor(email: string, fullname: string, password: string, userRole: UserRole) {
        this.email = email;
        this.fullname = fullname;
        this.password = password;
        this.userRole = userRole;
    }

    async validate(): Promise<boolean> {
        const errors = await validate(this);
        return errors.length > 0;
    }
}
