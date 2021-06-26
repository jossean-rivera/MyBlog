using Microsoft.EntityFrameworkCore;
using MyBlog.Models;

namespace MyBlog.Data
{
    /// <summary>
    /// Database session of blog items
    /// </summary>
    public class MyBlogDbContext : DbContext
    {
        /// <summary>
        /// Table of <see cref="Post"/> objects
        /// </summary>
        public DbSet<Post>? Posts { get; set; }

        /// <summary>
        /// Initializes context with options
        /// </summary>
        /// <param name="options">Db context options</param>
        public MyBlogDbContext(DbContextOptions<MyBlogDbContext> options) : base(options) { }
    }
}
