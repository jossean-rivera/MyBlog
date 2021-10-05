using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace MyBlog.WebApi.Filters
{
    /// <summary>
    /// An extension of the <see cref="ResponseCacheAttribute"/> where it only executes the cache logic
    /// if the environment is not equal to "Development". For a development environment, this attribute will
    /// ignore the resquest.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class NonDevResponseCacheAttribute : Attribute, IActionFilter, IOrderedFilter
    {
        /// <summary>
        /// Gets or sets the duration in seconds for which the response is cached.
        /// This sets "max-age" in "Cache-control" header.
        /// </summary>
        public int Duration { get; set; }

        /// <summary>
        /// Gets or sets the location where the data from a particular URL must be cached.
        /// </summary>
        public ResponseCacheLocation Location { get; set; }

        /// <summary>
        /// Gets or sets the value which determines whether the data should be stored or not.
        /// When set to <see langword="true"/>, it sets "Cache-control" header to "no-store".
        /// Ignores the "Location" parameter for values other than "None".
        /// Ignores the "duration" parameter.
        /// </summary>
        public bool NoStore { get; set; }

        /// <summary>
        /// Gets or sets the value for the Vary response header.
        /// </summary>
        public string? VaryByHeader { get; set; }

        /// <summary>
        /// Gets or sets the query keys to vary by.
        /// </summary>
        /// <remarks>
        /// <see cref="VaryByQueryKeys"/> requires the response cache middleware.
        /// </remarks>
        public string[]? VaryByQueryKeys { get; set; }

        /// <summary>
        /// Gets or sets the value of the cache profile name.
        /// </summary>
        public string? CacheProfileName { get; set; }

        /// <inheritdoc />
        public int Order { get; set; } = 1;

        /// <inheritdoc />
        public void OnActionExecuting(ActionExecutingContext context)
        {
            //  Determine if the hosting environment is development
            IServiceProvider services = context.HttpContext.RequestServices;
            IWebHostEnvironment env = services.GetRequiredService<IWebHostEnvironment>();

            if (env.IsDevelopment())
            {
                //  Create a response cache attribute 
                ResponseCacheAttribute cacheAttr = new()
                {
                    Duration = Duration,
                    Location = Location,
                    NoStore = NoStore,
                    VaryByHeader = VaryByHeader,
                    VaryByQueryKeys = VaryByQueryKeys,
                    CacheProfileName = CacheProfileName
                };

                //  Create an instance of the ResponseCacheFilter
                //  See more: github.com/dotnet/aspnetcore/blob/main/src/Mvc/Mvc.Core/src/ResponseCacheAttribute.cs#L119
                IFilterMetadata filterMetadata = cacheAttr.CreateInstance(services);

                if (filterMetadata is IActionFilter filter)
                {
                    //  Invoke the response cache filter
                    filter.OnActionExecuting(context);
                }
            }
        }

        /// <inheritdoc />
        public void OnActionExecuted(ActionExecutedContext context)
        {

        }
    }
}

