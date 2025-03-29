import {User} from "@prisma/client";
import {prisma} from "../../prisma/PrismaClient";
import {User as UserModel} from "../Entities/User/User";

export class UserRepository {

    async createUser(user: UserModel): Promise<User> {
        return prisma.user.create(
            {
                data: user
            }
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {email}
        });
    }
}