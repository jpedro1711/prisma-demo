import { Router } from "express";
import {LoginController} from "./LoginController";

const router = Router();

const controller = new LoginController();

router.post('/login', controller.handle);

export default router;