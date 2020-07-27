const User = require ('../models/user');

class DalService{
    userNames = [ "Peter", "Alex", "Ivan", "Jane", "John", "Anny", "Oskar", "Robert", "Roman", "George"];
    async getUsers(){
        const users = this.userNames.map(
            (name, index) => {
                const user = new User();
                user.name = name;
                user.created.setDate((new Date()).getDate() - index);
                user.email = `${user.name}@example.com`;
                user.emailConfirmed = index % 2 === 0;
                return user;
            }
        );
        return users;
    }
}

module.exports = DalService;