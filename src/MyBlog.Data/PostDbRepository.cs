using Microsoft.EntityFrameworkCore;
using MyBlog.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyBlog.Data
{
    /// <summary>
    /// Database repostiory of <see cref="Post"/> object
    /// </summary>
    public class PostDbRepository : IPostRepository
    {
        private readonly MyBlogDbContext _context;

        /// <summary>
        /// Initailizes repository with Database context
        /// </summary>
        /// <param name="context">Database context</param>
        public PostDbRepository(MyBlogDbContext context) => _context = context;

        /// <inheritdoc />
        public async Task<Post> AddPostAsync(Post post)
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }

        /// <inheritdoc />
        public async Task<Post> GetPostAsync(int id) => await _context.Posts.FindAsync(id);

        /// <inheritdoc />
        public async Task<IEnumerable<Post>> GetPostsAsync() => await _context.Posts.ToArrayAsync();
    }
}
