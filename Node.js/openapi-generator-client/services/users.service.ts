import * as api from '../api/apis';
import * as models from '../model/models';
import { IncomingMessage } from 'http';

export class UsersService{
    constructor(private api: api.UsersApi) {
    }

    async getUsers(options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{response: IncomingMessage; body: models.User[];}> {
        return await this.api.getUsers(options);
    }

    async getUserById(id: number, options: {headers: {[name: string]: string}} = {headers: {}}): Promise<{response: IncomingMessage; body: models.User;}> {
        return await this.api.getUserById(id, options);
    }

    async getUserByName(name: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{response: IncomingMessage; body: models.User;}> {
        return await this.api.getUserByName(name);
    }

    async createUser(user: models.User, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{response: IncomingMessage; body: models.User;}> {
        return await this.api.createUser(user);        
    }

    async updateUser(id: number, user: models.User, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{response: IncomingMessage; body?: any;}> {
        return await this.api.updateUser(id, user);
    }
    
    async deleteUser(id: number, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{response: IncomingMessage; body?: any;}> {
        return await this.api.deleteUser(id);
    }
}