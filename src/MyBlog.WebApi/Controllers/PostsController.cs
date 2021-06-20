using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using MyBlog.Data;
using MyBlog.Models;
using MyBlog.WebApi.Routes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MyBlog.WebApi.Controllers
{
    /// <summary>
    /// Controller to handle HTTP requests regarding <see cref="Post"/> objects
    /// </summary>
    [ApiRoute]
    [ApiController]
    [ApiVersion("1.0")]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _repository;

        public PostsController(IPostRepository repository) => _repository = repository;

        /// <summary>
        /// Gets all posts in the repository
        /// </summary>
        /// <returns>Task that yields enumeration of <see cref="Post"/> objects</returns>
        [HttpGet]
        [ResponseCache(Duration = 3600)]
        public async Task<IEnumerable<Post>> GetPosts() => await _repository.GetPostsAsync();

        /// <summary>
        /// Gets single instance with type of <see cref="Post"/>
        /// </summary>
        /// <param name="id">Identifier of post</param>
        /// <returns>Task that yields single instance of <see cref="Post"/></returns>
        [HttpGet("{id}")]
        [ResponseCache(Duration = 3600)]
        public async Task<ActionResult<Post>> GetPost([Required, FromRoute] int id)
        {
            Post post = await _repository.GetPostAsync(id);

            if (post == default)
            {
                return NotFound($"Post with ID of {id} does not exist");
            }

            return post;
        }

        /// <summary>
        /// Adds new 
        /// </summary>
        /// <param name="post"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        [RequiredScope("Posts.ReadWrite")]
        public async Task<ActionResult<Post>> AddPost([Required, FromBody, Bind(
            nameof(Post.Title),
            nameof(Post.SubTitle),
            nameof(Post.Content),
            nameof(Post.Visible)
            )] Post post)
        {
            if (User.Identity.IsAuthenticated)
            {
                post.CreatedBy = User.FindFirst(ClaimTypes.Email)?.Value ?? "unknown";
            }

            Post newPost = await _repository.AddPostAsync(post);
            return CreatedAtAction(nameof(GetPost), new { id = newPost.PostId }, newPost);
        }
    }
}
