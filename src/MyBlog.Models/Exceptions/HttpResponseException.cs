using System;
using System.Net;
using System.Text.Json;

namespace MyBlog.Models.Exceptions
{
    /// <summary>
    /// Exception with aditional data to create an appropriate HTTP response 
    /// </summary>
    public abstract class HttpResponseException : Exception
    {
        /// <summary>
        /// Response status code
        /// </summary>
        public HttpStatusCode StatusCode { get; }

        /// <summary>
        /// Body of the response
        /// </summary>
        public object Value { get; }

        /// <summary>
        /// Initializes exception with status code and value arguments
        /// </summary>
        /// <param name="statusCode">HTTP status code of the response</param>
        /// <param name="value">Body of the reponse</param>
        public HttpResponseException(HttpStatusCode statusCode, object value) : base(GetExceptionMessage(value))
        {
            //  Set property values
            (StatusCode, Value) = (statusCode, value);

            //  Add fields to Data property
            Data.Add(nameof(StatusCode), StatusCode);
            Data.Add(nameof(Value), Value);
        }

        /// <summary>
        /// Gets user readible exception message from value object
        /// </summary>
        /// <param name="value">Body of the response</param>
        /// <returns>String message</returns>
        private static string GetExceptionMessage(object value)
        {
            if (value is string mssg)
            {
                return mssg;
            }

            return JsonSerializer.Serialize(value);
        }
    }
}
