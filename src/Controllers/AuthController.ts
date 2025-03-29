import {AuthService} from "../Services/AuthService";
import {NextFunction, Request, Response} from "express";
import {UserLoginRequest} from "../Entities/User/UserLoginRequest";
import {UserRegistrationRequest} from "../Entities/User/UserRegistrationRequest";
import {AuthRequest} from "../Middlewares/AuthMiddleware";

export class AuthController {
    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;

        const request: UserLoginRequest = new UserLoginRequest(email, password);

        const token: string | null = await this.authService.login(request);

        if (token){
            res.status(200).json({token: token, success: true});
        } else {
            res.status(401).json({error: 'Unauthorized'});
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        const {email, password, fullname, userRole} = req.body;

        const request: UserRegistrationRequest = new UserRegistrationRequest(email, password, fullname, userRole);
        console.log(this.authService);
        const createdUser: boolean = await this.authService.register(request);

        if (createdUser){
            res.status(200).json({message: "User created successfully."});
        } else {
            res.status(500).json({error: 'Error creating user'});
        }
    }

    getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
        if (!req.user) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }

        res.status(200).json({ user: req.user, success: true });
    };
}