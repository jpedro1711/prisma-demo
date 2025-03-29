import {NextFunction, Response} from "express";
import {AuthRequest} from "../../../Shared/Middlewares/AuthMiddleware";
import {BaseController} from "../../../Shared/Base/BaseController";
import {AppException} from "../../../Shared/Exceptions/AppException";

export class ProfileController extends BaseController {
    constructor() {
        super();
        this.handle = this.handle.bind(this);
    }

    async handle(req: AuthRequest, response: Response, next: NextFunction): Promise<void> {
        await this.handleRequest(req, response, next, async () => {
            if (!req.user) {
                throw new AppException("User not logged in", 401)
            }

            return req.user;
        })

    }
}