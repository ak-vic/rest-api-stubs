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
    public class UserController : ControllerBase
    {       
        private readonly ILogger<UserController> _logger;
        private readonly UserService userService;

        public UserController(ILogger<UserController> logger, UserService userService)
        {
            _logger = logger;
            this.userService = userService;
        }

        [HttpGet]
        [Route("/user")]
        public IEnumerable<User> Get()
        {
            return userService.GetUsers();
        }

        [HttpGet]
        [Route("/user/{id}")]
        public User Get(int id)
        {
            return userService.GetUser(id);
        }

        [HttpPost]
        [Route("/user")]
        public User Create(User user)
        {
            return user;
        }

        [HttpPut]
        [Route("/user/{id}")]
        public User Update(int id)
        {
            return userService.GetUser(id);
        }

        [HttpDelete]
        [Route("/user/{id}")]
        public User Delete(int id)
        {
            return userService.GetUser(id);
        }
    }
}
