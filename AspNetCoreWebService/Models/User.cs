using System;

namespace AspNetCoreWebService
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public DateTime Created { get; set; }

        public bool EmailConfirmed { get; set; }

        public string PasswordHash { get; set; }


    }
}
