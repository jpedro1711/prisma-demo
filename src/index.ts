import {prisma} from "../prisma/PrismaClient";
import dotenv from 'dotenv';
import express, { Application } from 'express';
import LoginRoutes from "./Features/Users/Login/LoginRoutes";
import RegistrationRoutes from "./Features/Users/Registration/RegistrationRoutes";
import ProfileRoutes from "./Features/Users/Profile/ProfileRoutes";
import {ErrorMiddleware} from "./Shared/Middlewares/ErrorMiddleware";
import nodemailer from "nodemailer";

async function main() {
    dotenv.config({ path: '../.env' });
    const app: Application = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/auth', LoginRoutes);
    app.use('/api/auth', RegistrationRoutes);
    app.use('/api/auth', ProfileRoutes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    app.use(ErrorMiddleware);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())