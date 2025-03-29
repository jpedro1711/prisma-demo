import {UserRepository} from "../Repositories/UserRepository";
import {User, UserRole} from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserLoginRequest} from "../Entities/User/UserLoginRequest";
import {UserRegistrationRequest} from "../Entities/User/UserRegistrationRequest";
import {User as UserModel} from "../Entities/User/User";

export class AuthService {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async register(user: UserRegistrationRequest): Promise<boolean> {
        const userExists: User | null = await this.userRepository.findByEmail(user.email);

        if (userExists) {
            return false;
        }

        const hashedPassword= await bcrypt.hash(user.password, 10);

        const userModelToBeCreated: UserModel = new UserModel(user.email, user.fullname, hashedPassword, user.userRole);

        const createdUser: User = await this.userRepository.createUser(userModelToBeCreated);

        return !!createdUser;
    }

    async login(user: UserLoginRequest): Promise<string | null> {
        const userExists: User | null = await this.userRepository.findByEmail(user.email);

        if (!userExists) {
            return null;
        }

        const isPasswordMatch = await bcrypt.compare(user.password, userExists.password);

        if (!isPasswordMatch) {
            return null;
        }

        return jwt.sign({ id: userExists.id, email: userExists.email }, process.env["JWT_SECRET"] as string, { expiresIn: '1h' });
    }

}