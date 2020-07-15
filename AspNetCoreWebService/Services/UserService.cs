using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebService.Services
{
    public class UserService
    {
        private static readonly string[] Names = new[]
        {
            "Peter", "Alex", "Ivan", "Jane", "John", "Anny", "Oskar", "Robert", "Roman", "George"
        };

        public User GetUser(int id)
        {
            return GetUsers().Where(user => user.Id == id).FirstOrDefault();
        }

        public User GetUser(string name)
        {
            return GetUsers().Where(user => user.Name == name).FirstOrDefault();
        }

        public List<User> GetUsers()
        {
            return Enumerable.Range(0, 9)
                .Select((user, index) => new User()
                {
                    Id = index + 1,
                    Created = DateTime.Now.AddDays(-index),
                    Name = Names[index],
                    Email = $"{Names[index]}@example.com",
                    EmailConfirmed = index % 2 == 0,
                    //PasswordHash = "06d49632c9dc9bcb62aeaef99612ba6b"
                })
                .ToList();
        }
    }
}
