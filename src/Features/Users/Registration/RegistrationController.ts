import {NextFunction, Request, Response} from "express";
import {RegistrationRepository} from "./RegistrationRepository";
import {RegistrationUseCase} from "./RegistrationUseCase";
import {UserRegistrationRequest} from "./UserRegistrationRequest";
import {BaseController} from "../../../Shared/Base/BaseController";

const repository = new RegistrationRepository();
const useCase = new RegistrationUseCase(repository);

export class RegistrationController extends BaseController {
    constructor() {
        super();
        this.handle = this.handle.bind(this);
    }

    async handle(req: Request, response: Response, next: NextFunction): Promise<void> {
         await this.handleRequest(req, response, next, async () => {
            const {email, password, fullname, userRole} = req.body;

            const request: UserRegistrationRequest = new UserRegistrationRequest(email, password, fullname, userRole);

            return await useCase.execute(request);
        })
    }
}