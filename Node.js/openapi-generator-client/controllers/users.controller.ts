import { UsersService } from "../services/users.service";
import * as models from '../model/models';

export class UsersController{
    constructor(private usersService: UsersService) {
    }
    
    async getUsersController(req: any, res: any) {
        const result = await this.usersService.getUsers();
        res.send(result);
    }

    async getUserByIdController(req: any, res: any) {
        const id: number = req.params.id;
        const result = await this.usersService.getUserById(id);
        res.send(result);
    }

    async getUserByNameController(req: any, res: any) {
        const name: string = req.params.name;
        const result = await this.usersService.getUserByName(name);
        res.send(result);
    }

    async createUserController(req: any, res: any) {
        //if(!req.body) return res.sendStatus(400);       
        const user: models.User = req.body;
        const result = await this.usersService.createUser(user);
        res.send(result);
    }

    async updateUserController(req: any, res: any) {
        //if(!req.body) return res.sendStatus(400);       
        const id: number = req.params.id;
        const user: models.User = req.body;
        const result = await this.usersService.updateUser(id, user);
        res.send(result);
    }

    async deleteUserController(req: any, res: any) {
        const id: number = req.params.id;
        const result = await this.usersService.deleteUser(id);
        res.send(result);
    }
}
