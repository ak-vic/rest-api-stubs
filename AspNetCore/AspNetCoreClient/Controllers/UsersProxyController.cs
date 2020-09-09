using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreClient.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AspNetCoreClient.Models;
using Microsoft.AspNetCore.Http;

namespace AspNetCoreClient.Controllers
{
    [ApiController]
    [ApiConventionType(typeof(DefaultApiConventions))]
    [Route("api/v1")]
    public class UsersProxyController : ControllerBase
    {
        private readonly ILogger<UsersProxyController> _logger;
        private readonly RemoteService remoteService;

        public UsersProxyController(ILogger<UsersProxyController> logger, RemoteService remoteService)
        {
            _logger = logger;
            this.remoteService = remoteService;
        }

        /// <summary>Get all users</summary>
        [HttpGet, Route("users")]
        public async Task<ActionResult<List<User>>> Get()
        {
            try
            {
                return await remoteService.GetAsync();
            }
            catch (ApiException ex)
            {
                switch (ex.StatusCode)
                {
                    case 404:
                        return NotFound();
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        /// <summary>Get user by id</summary>
        [HttpGet, Route("users/{id}")]
        public async Task<ActionResult<User>> GetById(int id)
        {
            try
            {
                return await remoteService.GetByIdAsync(id);
            }
            catch(ApiException ex)
            {
                switch (ex.StatusCode)
                {
                    case 404:
                        return NotFound();
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        /// <summary>Get user by name</summary>
        [HttpGet, Route("users/name/{name}")]
        public async Task<ActionResult<User>> GetByName(string name)
        {
            try
            {
                return await remoteService.GetByNameAsync(name);
            }
            catch (ApiException ex)
            {
                switch (ex.StatusCode)
                {
                    case 404:
                        return NotFound(); 
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        /// <summary>Create a user</summary>
        [HttpPost, Route("users")]
        public async Task<ActionResult<User>> Create(User user)
        {
            try
            {
                var createdUser = await remoteService.CreateAsync(user);
                return CreatedAtAction(nameof(Get), new { id = createdUser.Id }, createdUser);
            }
            catch (ApiException ex)
            {
                switch (ex.StatusCode)
                {
                    case 400:
                        return BadRequest();
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        /// <summary>Update user</summary>
        [HttpPut, Route("users/{id}")]
        public async Task<ActionResult<User>> Update(int id, User user)
        {
            try
            {
                await remoteService.UpdateAsync(id, user);
                return NoContent();
            }
            catch (ApiException ex)
            {
                switch (ex.StatusCode)
                {
                    case 400:
                        return BadRequest();
                    case 404:
                        return NotFound();
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        /// <summary>Delete user</summary>
        [HttpDelete, Route("users/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await remoteService.DeleteAsync(id);
                return NoContent();
            }
            catch (ApiException ex)
            {
                switch (ex.StatusCode)
                {
                    case 404:
                        return NotFound();
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
