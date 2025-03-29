import {prisma} from "../prisma/PrismaClient";
import dotenv from 'dotenv';
import express, { Application } from 'express';
import AuthRoutes from "./Routes/AuthRoutes";

async function main() {
    dotenv.config({ path: '../.env' });
    const app: Application = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/auth', AuthRoutes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())