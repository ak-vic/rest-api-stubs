using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreWebService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AspNetCoreWebService.Controllers
{
    [ApiController]
    public class UsersController : ControllerBase
    {       
        private readonly ILogger<UsersController> _logger;
        private readonly UserService userService;

        public UsersController(ILogger<UsersController> logger, UserService userService)
        {
            _logger = logger;
            this.userService = userService;
        }

        [HttpGet]
        [Route("/users")]
        public IEnumerable<User> Get()
        {
            return userService.GetUsers();
        }

        [HttpGet]
        [Route("/users/{id}")]
        public User Get(int id)
        {
            return userService.GetUser(id);
        }

        [HttpPost]
        [Route("/users")]
        public User Create(User user)
        {
            return user;
        }

        [HttpPut]
        [Route("/users/{id}")]
        public User Update(int id)
        {
            return userService.GetUser(id);
        }

        [HttpDelete]
        [Route("/users/{id}")]
        public User Delete(int id)
        {
            return userService.GetUser(id);
        }
    }
}
