using System.Collections.Generic;
using System.Threading.Tasks;
using MyBlog.Models;

namespace MyBlog.Data
{
    /// <summary>
    /// Repository of <see cref="Post"/> objects
    /// </summary>
    public interface IPostRepository
    {
        /// <summary>
        /// Gets all <see cref="Post"/> objects in the repository
        /// </summary>
        /// <returns>Task that yields enumeration of <see cref="Post"/></returns>
        Task<IEnumerable<Post>> GetPostsAsync();

        /// <summary>
        /// Gets single <see cref="Post"/> object from the repository
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Post> GetPostAsync(int id);

        /// <summary>
        /// Adds new <see cref="Post"/> object into the repository
        /// </summary>
        /// <param name="post">New post to add</param>
        /// <returns>Task that yields the added post</returns>
        Task<Post> AddPostAsync(Post post);

        /// <summary>
        /// Updates existing post in repository
        /// </summary>
        /// <param name="post">Post to update</param>
        /// <returns>Updated post</returns>
        Task<Post> UpdatePostAsync(Post post);

        /// <summary>
        /// Deletes a post at the repository
        /// </summary>
        /// <param name="id">Identifier of the post to remve</param>
        /// <returns>Removed post object</returns>
        Task<Post> DeletePostAsync(int id);
    }
}
