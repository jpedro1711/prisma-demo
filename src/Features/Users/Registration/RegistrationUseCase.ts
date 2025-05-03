import {User} from "@prisma/client";
import bcrypt from "bcrypt";
import {RegistrationRepository} from "./RegistrationRepository";
import {UserRegistrationRequest} from "./UserRegistrationRequest";
import {User as UserModel} from "../User";
import {AppException} from "../../../Shared/Exceptions/AppException";

export class RegistrationUseCase {
    constructor(private repository: RegistrationRepository) {}

    async execute(request: UserRegistrationRequest): Promise<boolean> {
        

        const userExists: User | null = await this.repository.findByEmail(request.email);

        if (userExists) {
            throw new AppException("User already exists with this e-mail", 400)
        }

        const hashedPassword= await bcrypt.hash(request.password, 10);

        const userModelToBeCreated: UserModel = new UserModel(request.email, request.fullname, hashedPassword, request.userRole);

        const createdUser: User = await this.repository.createUser(userModelToBeCreated);

        return !!createdUser;
    }
}