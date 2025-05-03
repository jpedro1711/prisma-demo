import {NextFunction, Request, Response} from "express";
import {RegistrationRepository} from "./RegistrationRepository";
import {RegistrationUseCase} from "./RegistrationUseCase";
import {UserRegistrationRequest} from "./UserRegistrationRequest";
import {BaseController} from "../../../Shared/Base/BaseController";
import { RegistrationSchema } from "./RegistrationSchema";

const repository = new RegistrationRepository();
const useCase = new RegistrationUseCase(repository);

export class RegistrationController extends BaseController {
    constructor() {
        super();
        this.handle = this.handle.bind(this);
    }

    async handle(req: Request, response: Response, next: NextFunction): Promise<void> {
         await this.handleRequest(req, response, next, async () => {
            const validated = RegistrationSchema.parse(req.body);

            const {email, password, fullname, userRole} = validated;

            const request: UserRegistrationRequest = new UserRegistrationRequest(email, password, fullname, userRole);

            return await useCase.execute(request);
        })
    }
}