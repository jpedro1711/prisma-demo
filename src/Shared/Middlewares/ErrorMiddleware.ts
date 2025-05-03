import { Request, Response, NextFunction } from "express";
import {AppException} from "../Exceptions/AppException";
import {ApiResponse} from "../Utils/ApiResponse";
import { ZodError } from "zod";

export function ErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppException) {
        return ApiResponse.error(res, err.message, err.status);
    }
    else if (err instanceof ZodError) {
        const message = err.errors
            .map(e => `${e.path.join(".")}: ${e.message}`)
            .join("; ");

        return ApiResponse.error(res, message, 400);
    }
    else {
        return ApiResponse.error(res, "Internal server error", 500);
    }

}