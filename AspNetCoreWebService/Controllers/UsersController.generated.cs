//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.6.2.0 (NJsonSchema v10.1.23.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

using AspNetCoreWebService.Models;

#pragma warning disable 108 // Disable "CS0108 '{derivedDto}.ToJson()' hides inherited member '{dtoBase}.ToJson()'. Use the new keyword if hiding was intended."
#pragma warning disable 114 // Disable "CS0114 '{derivedDto}.RaisePropertyChanged(String)' hides inherited member 'dtoBase.RaisePropertyChanged(String)'. To make the current member override that implementation, add the override keyword. Otherwise add the new keyword."
#pragma warning disable 472 // Disable "CS0472 The result of the expression is always 'false' since a value of type 'Int32' is never equal to 'null' of type 'Int32?'
#pragma warning disable 1573 // Disable "CS1573 Parameter '...' has no matching param tag in the XML comment for ...
#pragma warning disable 1591 // Disable "CS1591 Missing XML comment for publicly visible type or member ..."

namespace AspNetCoreWebService.Controllers
{
    using System = global::System;
    
    [System.CodeDom.Compiler.GeneratedCode("NSwag", "13.6.2.0 (NJsonSchema v10.1.23.0 (Newtonsoft.Json v12.0.0.0))")]
    [Microsoft.AspNetCore.Mvc.Route("api/v1")]
    public abstract class UsersControllerBase : Microsoft.AspNetCore.Mvc.ControllerBase
    {
        /// <summary>Get all users</summary>
        /// <returns>Success</returns>
        [Microsoft.AspNetCore.Mvc.HttpGet, Microsoft.AspNetCore.Mvc.Route("users")]
        public abstract System.Threading.Tasks.Task<Microsoft.AspNetCore.Mvc.ActionResult<System.Collections.Generic.List<User>>> Get();
    
        /// <summary>Create a user</summary>
        /// <returns>Success</returns>
        [Microsoft.AspNetCore.Mvc.HttpPost, Microsoft.AspNetCore.Mvc.Route("users")]
        public abstract System.Threading.Tasks.Task<Microsoft.AspNetCore.Mvc.ActionResult<User>> Create([Microsoft.AspNetCore.Mvc.FromBody] User body);
    
        /// <summary>Get user by id</summary>
        /// <returns>Success</returns>
        [Microsoft.AspNetCore.Mvc.HttpGet, Microsoft.AspNetCore.Mvc.Route("users/{id}")]
        public abstract System.Threading.Tasks.Task<Microsoft.AspNetCore.Mvc.ActionResult<User>> GetById([Microsoft.AspNetCore.Mvc.ModelBinding.BindRequired] int id);
    
        /// <summary>Update user</summary>
        /// <returns>Success</returns>
        [Microsoft.AspNetCore.Mvc.HttpPut, Microsoft.AspNetCore.Mvc.Route("users/{id}")]
        public abstract System.Threading.Tasks.Task<Microsoft.AspNetCore.Mvc.ActionResult<User>> Update([Microsoft.AspNetCore.Mvc.ModelBinding.BindRequired] int id, [Microsoft.AspNetCore.Mvc.FromBody] User body);
    
        /// <summary>Delete user</summary>
        /// <returns>Success</returns>
        [Microsoft.AspNetCore.Mvc.HttpDelete, Microsoft.AspNetCore.Mvc.Route("users/{id}")]
        public abstract System.Threading.Tasks.Task<Microsoft.AspNetCore.Mvc.IActionResult> Delete([Microsoft.AspNetCore.Mvc.ModelBinding.BindRequired] int id);
    
        /// <summary>Get user by name</summary>
        /// <returns>Success</returns>
        [Microsoft.AspNetCore.Mvc.HttpGet, Microsoft.AspNetCore.Mvc.Route("users/name/{name}")]
        public abstract System.Threading.Tasks.Task<Microsoft.AspNetCore.Mvc.ActionResult<User>> GetByName([Microsoft.AspNetCore.Mvc.ModelBinding.BindRequired] string name);
    
    }

    

}

#pragma warning restore 1591
#pragma warning restore 1573
#pragma warning restore  472
#pragma warning restore  114
#pragma warning restore  108