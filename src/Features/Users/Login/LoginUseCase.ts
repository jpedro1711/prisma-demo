import {LoginRepository} from "./LoginRepository";
import {UserLoginRequest} from "./UserLoginRequest";
import {User} from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {AppException} from "../../../Shared/Exceptions/AppException";

export class LoginUseCase {
    constructor(private repository: LoginRepository) {}

    async execute(request: UserLoginRequest): Promise<{ token: string }> {
        const userExists: User | null = await this.repository.findByEmail(request.email);

        if (!userExists) {
            throw new AppException("User not found", 400)
        }

        const isPasswordMatch = await bcrypt.compare(request.password, userExists.password);

        if (!isPasswordMatch) {
            throw new AppException("Invalid credentials", 401)
        }

        const token = jwt.sign({ id: userExists.id, email: userExists.email }, process.env["JWT_SECRET"] as string, { expiresIn: '1h' });

        return { token: token }
    }
}