import { UsersService } from "../services/users.service";
import * as models from '../model/models';
import { IncomingMessage } from "http";
import { logRequest } from "../logger/logger";
import { Request, Response, NextFunction } from 'express';

export class UsersController {
    constructor(private usersService: UsersService) {
    }

    getOptions(res: Response): { headers: { [name: string]: string } } {
        const xCorrelationId = res.getHeader("x-correlation-id") as string;
        const options = { headers: { "x-correlation-id": xCorrelationId } };
        return options;
    }

    async getUsersController(req: Request, res: Response) {
        try {
            const result = await this.usersService.getUsers(this.getOptions(res));
            this.sendStatusCodeAndBody(req, res, result);
        }
        catch (err) {
            this.sendStatus500(req, res, err);
        }
    }

    async getUserByIdController(req: any, res: any) {
        try {
            const id: number = req.params.id;
            const result = await this.usersService.getUserById(id, this.getOptions(res));
            this.sendStatusCodeAndBody(req, res, result);
        }
        catch (err) {
            this.sendStatus500(req, res, err);
        }
    }

    async getUserByNameController(req: any, res: any) {
        try {
            const name: string = req.params.name;
            const result = await this.usersService.getUserByName(name, this.getOptions(res));
            this.sendStatusCodeAndBody(req, res, result);
        }
        catch (err) {
            this.sendStatus500(req, res, err);
        }
    }

    async createUserController(req: any, res: any, next: any) {
        try {
            const user: models.User = req.body;
            const result = await this.usersService.createUser(user, this.getOptions(res));
            if (result.response && result.response.statusCode === 201) {
                res.header("Location", result.response.headers.location);
            }
            this.sendStatusCodeAndBody(req, res, result);
        }
        catch (err) {
            this.sendStatus500(req, res, err);
        }
    }

    async updateUserController(req: any, res: any) {
        try {
            const id: number = req.params.id;
            const user: models.User = req.body;
            const result = await this.usersService.updateUser(id, user, this.getOptions(res));
            this.sendStatusCodeAndBody(req, res, result);
        }
        catch (err) {
            this.sendStatus500(req, res, err);
        }
    }

    async deleteUserController(req: any, res: any) {
        try {
            const id: number = req.params.id;
            const result = await this.usersService.deleteUser(id, this.getOptions(res));
            this.sendStatusCodeAndBody(req, res, result);
        }
        catch (err) {
            this.sendStatus500(req, res, err);
        }
    }

    sendStatusCodeAndBody(req: Request, res: Response, result: { response: IncomingMessage; body?: any }) {
        if (!result.response) {
            const errMsg = "Server is not responding";
            logRequest(req, res, errMsg, "error");
            res.status(500).send(errMsg);
        }
        else {
            res.status(result.response.statusCode as number).send(result.body);
        }
    }

    sendStatus500(req: Request, res: Response, err: Error) {
        const errMsg = err.message;
        logRequest(req, res, errMsg, "error");
        res.status(500).send(errMsg);
    }
}
