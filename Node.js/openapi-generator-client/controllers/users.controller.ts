import { UsersService } from "../services/users.service";
import * as models from '../model/models';
import { IncomingMessage } from "http";
import { response } from "express";

export class UsersController{
    constructor(private usersService: UsersService) {
    }
    
    async getUsersController(req: any, res: any) {
        try{
            const result = await this.usersService.getUsers();
            this.sendStatusCodeAndBody(res, result);
        }
        catch{
            this.sendStatus500(res);
        }
    }

    async getUserByIdController(req: any, res: any) {
        try{
            const id: number = req.params.id;
            const result = await this.usersService.getUserById(id);
            this.sendStatusCodeAndBody(res, result);
        }
        catch{
            this.sendStatus500(res);
        }
    }

    async getUserByNameController(req: any, res: any) {
        try{
            const name: string = req.params.name;
            const result = await this.usersService.getUserByName(name);
            this.sendStatusCodeAndBody(res, result);
        }
        catch{
            this.sendStatus500(res);
        }
    }

    async createUserController(req: any, res: any) {
        try{
            const user: models.User = req.body;
            const result = await this.usersService.createUser(user);
            if(result.response.statusCode === 201){
                res.header("Location", result.response.headers.location);
            }
            res.status(result.response.statusCode).send(result.body);
            this.sendStatusCodeAndBody(res, result);
        }
        catch{
            this.sendStatus500(res);
        }
    }

    async updateUserController(req: any, res: any) {
        try{
            const id: number = req.params.id;
            const user: models.User = req.body;
            const result = await this.usersService.updateUser(id, user);
            this.sendStatusCodeAndBody(res, result);
        }
        catch{
            this.sendStatus500(res);
        }
    }

    async deleteUserController(req: any, res: any) {
        try{
            const id: number = req.params.id;
            const result = await this.usersService.deleteUser(id);
            this.sendStatusCodeAndBody(res, result);
        }
        catch{
            this.sendStatus500(res);
        }
    }

    sendStatusCodeAndBody(response: any, result: {response: IncomingMessage; body?: any}){
        response.status(result.response.statusCode).send(result.body);
    }

    sendStatus500(response: any){
        response.status(500).send('Something went wrong');
    }
}
