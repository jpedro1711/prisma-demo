import {LoginRepository} from "./LoginRepository";
import {LoginUseCase} from "./LoginUseCase";
import {UserLoginRequest} from "./UserLoginRequest";
import {NextFunction, Request, Response} from "express";
import {BaseController} from "../../../Shared/Base/BaseController";

const repository = new LoginRepository();
const useCase = new LoginUseCase(repository);

export class LoginController extends BaseController {
    constructor() {
        super();
        this.handle = this.handle.bind(this);
    }

    async handle(req: Request, response: Response, next: NextFunction): Promise<void> {
        await this.handleRequest(req, response, next, async () => {
            const {email, password} = req.body;

            const request: UserLoginRequest = new UserLoginRequest(email, password);

            return await useCase.execute(request);
        });
    }
}