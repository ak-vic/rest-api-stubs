const User = require ('../models/user');

class DalService{
    static userNames = [ "Peter", "Alex", "Ivan", "Jane", "John", "Anny", "Oskar", "Robert", "Roman", "George"];
    static getUsers(){
        const users = this.userNames.map(
            (name, index) => {
                const user = new User();
                user.id = index + 1;
                user.name = name;
                let created = new Date();
                created.setDate(created.getDate() - index);
                user.created = created;
                user.email = `${user.name}@example.com`;
                user.emailConfirmed = index % 2 === 0;
                return user;
            }
        );
        return users;
    }
    static getUserById(id){
        return this.getUsers().filter((user) => user.id === id);
    }
    static getUserByName(name){
        return this.getUsers().filter((user) => user.name.toUpperCase() === name.toUpperCase());
    }
}

module.exports = DalService;