using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreClient.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AspNetCoreClient.Models;

namespace AspNetCoreClient.Controllers
{
    [ApiController]
    public class UsersProxyController : ControllerBase
    {
        private readonly ILogger<UsersProxyController> _logger;
        private readonly RemoteService remoteService;

        public UsersProxyController(ILogger<UsersProxyController> logger, RemoteService remoteService)
        {
            _logger = logger;
            this.remoteService = remoteService;
        }

        [HttpGet, Route("users")]
        public async Task<ICollection<User>> Get()
        {
            return await remoteService.GetAsync();
        }
        
    }
}
