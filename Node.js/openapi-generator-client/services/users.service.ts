import * as api from '../api/apis';
import * as models from '../model/models';
import { IncomingMessage } from 'http';

export class UsersService{
    constructor(private api: api.UsersApi) {
    }

    async getUsers() : Promise<{response: IncomingMessage; body: models.User[];}> {
        return await this.api.getUsers();
    }

    async getUserById(id: number): Promise<{response: IncomingMessage; body: models.User;}> {
        return await this.api.getUserById(id);
    }

    async getUserByName(name: string) : Promise<{response: IncomingMessage; body: models.User;}> {
        return await this.api.getUserByName(name);
    }

    async createUser(user: models.User) : Promise<{response: IncomingMessage; body: models.User;}> {
        return await this.api.createUser(user);        
    }

    async updateUser(id: number, user: models.User) : Promise<{response: IncomingMessage; body?: any;}> {
        return await this.api.updateUser(id, user);
    }
    
    async deleteUser(id: number) : Promise<{response: IncomingMessage; body?: any;}> {
        return await this.api.deleteUser(id);
    }
}