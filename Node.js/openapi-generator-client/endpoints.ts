import { UsersController } from "./controllers/users.controller";

export class Endpoints {
    constructor (app: any, usersController: UsersController) {
        app.get('/users', usersController.getUsersController.bind(usersController));
        app.get('/users/:id', usersController.getUserByIdController.bind(usersController));
        app.get('/users/name/:name', usersController.getUserByNameController.bind(usersController));
        app.post('/users', usersController.createUserController.bind(usersController));
        app.put('/users/:id', usersController.updateUserController.bind(usersController));
        app.delete('/users/:id', usersController.deleteUserController.bind(usersController));        
    }
}
