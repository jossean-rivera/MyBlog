using Microsoft.AspNetCore.Mvc.Routing;
using System;

namespace MyBlog.WebApi.Routes
{
    /// <summary>
    /// Route api provider
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
    public class ApiRoute : Attribute, IRouteTemplateProvider
    {
        private const string ApiKey = "api";
        private readonly string _template;

        /// <summary>
        /// Initializes <see cref="Template"/> to start with "api"
        /// </summary>
        /// <param name="template">Ending part of the template</param>
        public ApiRoute(string template = "[controller]")
        {
            if (template is null)
            {
                throw new ArgumentNullException(nameof(template));
            }

            if (!template.StartsWith(ApiKey, StringComparison.OrdinalIgnoreCase))
            {
                template = $"{ApiKey}/{template.TrimStart(trimChar: '/')}";
            }
            _template = template;
        }

        /// <inheritdoc />
        public string Template => _template;

        /// <inheritdoc />
        public int? Order => 1;

        /// <inheritdoc />
        public string Name => "ApiRoute";
    }
}
