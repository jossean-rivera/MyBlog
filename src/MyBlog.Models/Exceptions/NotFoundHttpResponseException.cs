using System.Net;

namespace MyBlog.Models.Exceptions
{
    /// <summary>
    /// The server can not find the requested resource. In the browser, this means the URL is not recognized. 
    /// In an API, this can also mean that the endpoint is valid but the resource itself does not exist. 
    /// Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. 
    /// This response code is probably the most famous one due to its frequent occurrence on the web.
    /// </summary>
    public class NotFoundHttpResponseException : HttpResponseException
    {
        /// <summary>
        /// Initailzies HTTP response exception with 404 status code
        /// </summary>
        /// <param name="value">Body of the request</param>
        public NotFoundHttpResponseException(object value) : base(HttpStatusCode.NotFound, value)
        {

        }
    }
}
