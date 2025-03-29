import { Request, Response, NextFunction } from "express";
import {AppException} from "../Exceptions/AppException";
import {ApiResponse} from "../Utils/ApiResponse";

export function ErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppException) {
        return ApiResponse.error(res, err.message, err.status);
    }

    return ApiResponse.error(res, "Internal server error", 500);
}