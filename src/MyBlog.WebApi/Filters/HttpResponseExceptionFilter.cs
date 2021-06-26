using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Hosting;
using MyBlog.Models.Exceptions;

namespace MyBlog.WebApi.Filters
{
    /// <summary>
    /// Exception filter that handles exceptions of type <see cref="HttpResponseException"/>
    /// </summary>
    public class HttpResponseExceptionFilter : IExceptionFilter
    {
        private readonly IWebHostEnvironment _env;

        public HttpResponseExceptionFilter(IWebHostEnvironment env) => _env = env;

        /// <inheritdoc />
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is HttpResponseException httpException)
            {
                context.Result = new ObjectResult(httpException.Value)
                {
                    StatusCode = (int)httpException.StatusCode
                };
                context.ExceptionHandled = true;
            }
            else
            {
                object result = _env.IsDevelopment() ? context.Exception : "Something went wrong. Try Again.";
                context.Result = new ObjectResult(result)
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
                context.ExceptionHandled = true;
            }
        }
    }
}
