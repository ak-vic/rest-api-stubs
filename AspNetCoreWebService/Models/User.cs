using System;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreWebService
{
    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The Name is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "The Name should be minimum 3 characters and a maximum of 50 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The Email Address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        public DateTime Created { get; set; }

        public bool EmailConfirmed { get; set; }

        private string PasswordHash { get; set; }


    }
}
