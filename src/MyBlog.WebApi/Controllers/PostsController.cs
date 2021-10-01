using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using MyBlog.Data;
using MyBlog.Models;
using MyBlog.WebApi.Filters;
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
    [MinResponseTime(3_000)]
    public class PostsController : ControllerBase
    {
        private const string PostScope = "Posts.ReadWrite";
        private readonly IPostRepository _repository;

        /// <summary>
        /// Default constructor used by DI
        /// </summary>
        public PostsController(IPostRepository repository) => _repository = repository;

        /// <summary>
        /// Gets all posts in the repository
        /// </summary>
        /// <returns>Task that yields enumeration of <see cref="Post"/> objects</returns>
        [HttpGet]
        //[ResponseCache(Duration = 3600)]
        public async Task<IEnumerable<Post>> GetPosts() => await _repository.GetPostsAsync();

        /// <summary>
        /// Gets single instance with type of <see cref="Post"/>
        /// </summary>
        /// <param name="id">Identifier of post</param>
        /// <returns>Task that yields single instance of <see cref="Post"/></returns>
        [HttpGet("{id}")]
        //[ResponseCache(Duration = 3600)]
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
        /// Adds new post object to the data store
        /// </summary>
        /// <param name="post">Post object to save</param>
        /// <returns>Created at action result</returns>
        [HttpPost]
        [Authorize]
        [RequiredScope(PostScope)]
        public async Task<ActionResult<Post>> AddPost([Required, FromBody, Bind(
            nameof(Post.Title),
            nameof(Post.SubTitle),
            nameof(Post.Content),
            nameof(Post.Visible)
            )] Post post)
        {
            if (User.Identity!.IsAuthenticated)
            {
                post.CreatedBy = User.FindFirstValue(ClaimTypes.Email) ?? 
                    User.FindFirstValue(ClaimTypes.Upn) ??
                    "unknown";
            }

            Post newPost = await _repository.AddPostAsync(post);
            return CreatedAtAction(nameof(GetPost), new { id = newPost.PostId }, newPost);
        }

        /// <summary>
        /// Updates existing post in data store
        /// </summary>
        /// <param name="post">Post object to update</param>
        /// <returns>Object result including updated post</returns>
        [HttpPut]
        [Authorize]
        [RequiredScope(PostScope)]
        public async Task<ActionResult<Post>> UpdatePost([Required, FromBody, Bind(
            nameof(Post.PostId),
            nameof(Post.Title),
            nameof(Post.SubTitle),
            nameof(Post.Content),
            nameof(Post.Visible)
            )] Post post)
        {
            Post updatedPost = await _repository.UpdatePostAsync(post);
            return updatedPost;
        }

        /// <summary>
        /// Deletes post in data store
        /// </summary>
        /// <param name="id">Identifier of the post to delete</param>
        /// <returns>Object result including the deleted post</returns>
        [HttpDelete("{id}")]
        [Authorize]
        [RequiredScope(PostScope)]
        public async Task<ActionResult<Post>> DeletePost([Required, FromRoute] int id)
        {
            Post post = await _repository.DeletePostAsync(id);
            return post;
        }
    }
}
