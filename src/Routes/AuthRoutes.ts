import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";
import { authenticateToken } from "../Middlewares/AuthMiddleware";
import { AuthService } from "../Services/AuthService";
import { UserRepository } from "../Repositories/UserRepository";

const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService); // Passe o authService aqui

router.post('/register', authController.register);
router.post('/signin', authController.login);
router.get("/me", authenticateToken, authController.getProfile);

export default router;