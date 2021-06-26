using System.Net;

namespace MyBlog.Models.Exceptions
{
    /// <summary>
    /// The server could not understand the request due to invalid syntax
    /// </summary>
    public class BadRequestHttpResponseException : HttpResponseException
    {
        /// <summary>
        /// Initializes HTTP response exception with 400 status code
        /// </summary>
        /// <param name="value">Body of the response</param>
        public BadRequestHttpResponseException(object value) : base(HttpStatusCode.BadRequest, value)
        {

        }
    }
}
