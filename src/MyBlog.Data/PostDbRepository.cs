using Microsoft.EntityFrameworkCore;
using MyBlog.Models;
using MyBlog.Models.Exceptions;
using System;
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
            if (post is null)
            {
                throw new BadRequestHttpResponseException("Post object is required");
            }

            if (post.PostId != default)
            {
                throw new BadRequestHttpResponseException($"{nameof(Post.PostId)} must have the default value of 0");
            }

            post.CreateDate = post.ModifyDate = DateTime.Now;
            _context.Posts!.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }

        /// <inheritdoc />
        public async Task<Post> GetPostAsync(int id) => await _context.Posts!.FindAsync(id);

        /// <inheritdoc />
        public async Task<IEnumerable<Post>> GetPostsAsync() => await _context.Posts.ToArrayAsync();

        /// <inheritdoc />
        public async Task<Post> UpdatePostAsync(Post post)
        {
            if (post is null)
            {
                throw new BadRequestHttpResponseException("Post object is required to update data store");
            }

            if (post.PostId <= 0)
            {
                throw new BadRequestHttpResponseException($"{nameof(Post.PostId)} is required to update data store");
            }

            post.ModifyDate = DateTime.Now;
            _context.Posts!.Update(post);
            _ = await _context.SaveChangesAsync();
            return post;
        }

        /// <inheritdoc />
        public async Task<Post> DeletePostAsync(int id)
        {
            Post? post = await _context.Posts!.FindAsync(id);

            if (post is null)
            {
                throw new NotFoundHttpResponseException($"Cannot find post with ID equal to {id}.");
            }

            _context.Posts.Remove(post);
            _ = await _context.SaveChangesAsync();
            return post;
        }
    }
}
