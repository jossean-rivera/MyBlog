using MyBlog.Models;
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
        public Task<Post> GetPostAsync(int id) => Task.FromResult(_posts.FirstOrDefault(post => post.PostId == id));

        /// <inheritdoc />
        public Task<IEnumerable<Post>> GetPostsAsync() => Task.FromResult(_posts as IEnumerable<Post>);

        /// <inheritdoc />
        public Task<Post> AddPostAsync(Post post)
        {
            if (post is null)
            {
                throw new ArgumentNullException(nameof(post));
            }

            post.PostId = _posts.Any() ? _posts.Max(p => p.PostId) + 1 : 1;
            post.CreateDate = post.ModifyDate = DateTime.Now;

            _posts.Add(post);
            return Task.FromResult(post);
        }
    }
}
