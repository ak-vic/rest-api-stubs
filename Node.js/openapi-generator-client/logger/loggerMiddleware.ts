import { logRequest } from "./logger"
import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    let xRequestId = req.headers["x-request-id"] as string;
    let xCorrelationId = req.headers["x-correlation-id"] as string;
    if (!xCorrelationId) {
        xCorrelationId = uuidv4();
    }
    if (!xRequestId) {
        xRequestId = uuidv4();
    }
    //TODO: make conditional assignment
    res.header("x-correlation-id", xCorrelationId);
    res.header("x-request-id", xRequestId);
    logRequest(req, res);
    next();
}

export function loggerErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    logRequest(req, res, err.message, "error");
    res.status(500).send(err.message);
}

function uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
