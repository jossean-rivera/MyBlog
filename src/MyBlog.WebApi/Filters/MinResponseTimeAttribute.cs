using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

namespace MyBlog.WebApi.Filters
{
    /// <summary>
    /// Action filter that forces the controller action to take at least a certain amount of time before a response is issued.
    /// This is only used in development mode to simulate a longer network connection to perform testing with the UI.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class MinResponseTimeAttribute : Attribute, IActionFilter, IOrderedFilter
    {
        private IWebHostEnvironment? _env;
        private long _startTime;
        private long _endTime;
        private long _runTime;
        private long _minRunTime;

        /// <summary>
        /// Initializes attribute with the minimun amount of time the controller action need to take
        /// </summary>
        /// <param name="minRunTimeMS"></param>
        public MinResponseTimeAttribute(long minRunTimeMS = 1000) => _minRunTime = minRunTimeMS;

        /// <inheritdoc />
        public int Order => 2_000_000_000;

        /// <inheritdoc />
        public void OnActionExecuting(ActionExecutingContext context)
        {
            _env ??= context.HttpContext.RequestServices.GetService<IWebHostEnvironment>();

            if (_env.IsDevelopment())
            {
                _startTime = GetCurrentTimeInMillisenconds();
            }
        }
        
        /// <inheritdoc />
        public void OnActionExecuted(ActionExecutedContext context)
        {
            _env ??= context.HttpContext.RequestServices.GetService<IWebHostEnvironment>();

            if (_env.IsDevelopment())
            {
                _endTime = GetCurrentTimeInMillisenconds();
                _runTime = _endTime - _startTime;
                if (_minRunTime > _runTime)
                {
                    Task.Delay(TimeSpan.FromMilliseconds(_minRunTime - _runTime)).Wait();
                }
            }
        }

        private static long GetCurrentTimeInMillisenconds() => DateTime.Now.Ticks / TimeSpan.TicksPerMillisecond;
    }
}
