using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreWebService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using AspNetCoreWebService.Models;
using System.Threading;

namespace AspNetCoreWebService.Controllers
{
    [ApiController]
    [ApiConventionType(typeof(DefaultApiConventions))]
    public class UsersController : UsersControllerBase
    {       
        private readonly ILogger<UsersController> _logger;
        private readonly UserService userService;

        public UsersController(ILogger<UsersController> logger, UserService userService)
        {
            _logger = logger;
            this.userService = userService;
        }

        /// <summary>Create a user</summary>
        public async override Task<ActionResult<User>> Create([FromBody] User user)
        {
            user.Id = 9999;
            return CreatedAtAction(nameof(Get), new { id = 9999 }, user);
        }

        /// <summary>Delete user</summary>
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async override Task<IActionResult> Delete(int id)
        {
            var user = userService.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        /// <summary>Get all users</summary>
        public async override Task<ActionResult<List<User>>> Get()
        {
            return await Task.FromResult(userService.GetUsers());
        }

        /// <summary>Get user by id</summary>
        public async override Task<ActionResult<User>> GetById(int id)
        {
            var user = userService.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        /// <summary>Get user by name</summary>
        public async override Task<ActionResult<User>> GetByName([BindRequired] string name)
        {
            var user = userService.GetUser(name);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        /// <summary>Update user</summary>
        public async override Task<IActionResult> Update(int id, [FromBody] User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            var originalUser = userService.GetUser(id);
            if (originalUser == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
