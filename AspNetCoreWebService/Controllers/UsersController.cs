using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreWebService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.Net.Mime;

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
        /*
        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("/users")]
        public IEnumerable<User> Get()
        {
            return userService.GetUsers();
        }

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("/users/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<User> Get(int id)
        {
            var user = userService.GetUser(id);
            if(user == null)
            {
                return NotFound();
            }
            return user;
        }
        
        /// <summary>
        /// Create a user
        /// </summary>
        /// <param name="user"></param>
        /// <returns>Created user object</returns>
        [HttpPost]
        [Route("/users")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<User> Create(User user)
        {
            user.Id = 9999;
            return CreatedAtAction(nameof(Get), new { id = 9999 }, user);
        }
*/
        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("/users/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<User> Update(int id, User user)
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
            originalUser.Created = user.Created;
            originalUser.Email = user.Email;
            originalUser.EmailConfirmed = user.EmailConfirmed;
            originalUser.Name = user.Name;
            //TODO: fix return value
            //return originalUser;
            return Ok();
        }

        /// <summary>
        /// Delete user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("/users/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<User> Delete(int id)
        {
            var user = userService.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
