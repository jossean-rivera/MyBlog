using Moq;
using MyBlog.Data;
using MyBlog.Models;
using MyBlog.WebApi.Controllers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace MyBlog.Tests
{
    public class PostsControllerTests
    {
        private readonly Mock<IPostRepository> _repositoryMock = new Mock<IPostRepository>();

        [Fact]
        public async Task GetPostsAsync()
        {
            //  Arrange
            IEnumerable<Post> posts = new HashSet<Post>
            {
                new Post { PostId = 1, Title = "Testing Post" }
            };

            _repositoryMock.Setup(repo => repo.GetPostsAsync())
                .ReturnsAsync(posts)
                .Verifiable();

            PostsController controller = new PostsController(_repositoryMock.Object);

            //  Act
            IEnumerable<Post> result = await controller.GetPosts();

            //  Assert
            Assert.Equal(posts, result);
        }
    }
}
