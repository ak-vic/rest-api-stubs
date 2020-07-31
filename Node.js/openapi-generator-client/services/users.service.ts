import * as api from '../api/apis';
import * as models from '../model/models';

export class UsersService{
    constructor(private api: api.UsersApi) {
    }

    async getUsers() {
        const users = await this.api.getUsers();
        return users.body;
    }

    async getUserById(id: number) {
        const user = await this.api.getUserById(id);
        return user.body;
    }

    async getUserByName(name: string) {
        const user = await this.api.getUserByName(name);
        return user.body;
    }

    async createUser(user: models.User) {
        const result = await this.api.createUser(user);        
        return result.response;
    }

    async updateUser(id: number, user: models.User) {
        const result = await this.api.updateUser(id, user);
        return result.response;
    }
    
    async deleteUser(id: number) {
        const result = await this.api.deleteUser(id);
        return result.response;
    }
}