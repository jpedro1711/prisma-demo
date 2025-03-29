import { Router } from "express";
import {ProfileController} from "./ProfileController";
import {authenticateToken} from "../../../Shared/Middlewares/AuthMiddleware";

const router = Router();

const controller = new ProfileController();

router.get('/me', authenticateToken, controller.handle);

export default router;