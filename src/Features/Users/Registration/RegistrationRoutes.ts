import { Router } from "express";
import {RegistrationController} from "./RegistrationController";

const router = Router();

const controller = new RegistrationController();

router.post('/register', controller.handle);

export default router;