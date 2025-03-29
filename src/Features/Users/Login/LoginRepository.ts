import {User} from "@prisma/client";
import {prisma} from "../../../../prisma/PrismaClient";

export class LoginRepository {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {email}
        });
    }
}