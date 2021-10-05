using MyBlog.Models;
using MyBlog.Models.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyBlog.Data
{
    /// <summary>
    /// Repository of <see cref="Post"/> objects stored in memory
    /// </summary>
    public class MemoryPostRepository : IPostRepository
    {
        private readonly ICollection<Post> _posts = new HashSet<Post>
        {
            new Post
            {
                PostId = 1,
                Title = "Hello, World in C#",
                SubTitle = "Start coding now in C#",
                Content = string.Empty,
                Visible = true,
                CreateDate = DateTime.Now,
                ModifyDate = DateTime.Now,
                CreatedBy = "jossean.rivera@outlook.com"
            },
            new Post
            {
                PostId = 2,
                Title = "Object-Oriented Programming with C++",
                SubTitle = "Learn OOP",
                Content = string.Empty,
                Visible = true,
                CreateDate = DateTime.Now,
                ModifyDate = DateTime.Now,
                CreatedBy = "jossean.rivera@outlook.com"
            }
        };

        /// <inheritdoc />
        public Task<Post> GetPostAsync(int id) => Task.FromResult(
            _posts.FirstOrDefault(post => post.PostId == id) ??
            throw new NotFoundHttpResponseException($"Cannot find post with ID equal to {id}"));

        /// <inheritdoc />
        public Task<IEnumerable<Post>> GetPostsAsync() => Task.FromResult(_posts.Where(post => post.Visible));

        /// <inheritdoc />
        public Task<Post> AddPostAsync(Post post)
        {
            if (post is null)
            {
                throw new BadRequestHttpResponseException("Post object is required");
            }

            post.PostId = _posts.Any() ? _posts.Max(p => p.PostId) + 1 : 1;
            post.CreateDate = post.ModifyDate = DateTime.Now;

            _posts.Add(post);
            return Task.FromResult(post);
        }

        /// <inheritdoc />
        public Task<Post> UpdatePostAsync(Post post)
        {
            if (post is null)
            {
                throw new BadRequestHttpResponseException("Post object is required to update data store");
            }

            if (post.PostId == default)
            {
                throw new BadRequestHttpResponseException($"{nameof(Post.PostId)} is required to update data store");
            }

            Post? existingPost = _posts.FirstOrDefault(p => p.PostId == post.PostId);

            if (existingPost is null)
            {
                throw new NotFoundHttpResponseException($"Post object is ID of {post.PostId} does not exist.");
            }

            _posts.Remove(existingPost);

            post.ModifyDate = DateTime.Now;
            _posts.Add(post);
            return Task.FromResult(post);
        }

        /// <inheritdoc />
        public Task<Post> DeletePostAsync(int id)
        {
            Post? post = _posts.FirstOrDefault(p => p.PostId == id);

            if (post is null)
            {
                throw new NotFoundHttpResponseException($"Post with ID of {id} does not exist");
            }

            _posts.Remove(post);
            return Task.FromResult(post);
        }
    }
}
