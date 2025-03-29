import {User} from "@prisma/client";
import {prisma} from "../../../../prisma/PrismaClient";
import {User as UserModel} from "../User";

export class RegistrationRepository {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {email}
        });
    }

    async createUser(user: UserModel): Promise<User> {
        return prisma.user.create(
            {
                data: user
            }
        );
    }
}