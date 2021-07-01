using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MyBlog.Data;
using MyBlog.Models;
using MyBlog.WebApi.Controllers;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace MyBlog.Tests.Controllers
{
    /// <summary>
    /// Tests reagarding the <see cref="PostsController"/> from web api project
    /// </summary>
    [TestClass]
    public class PostsControllerTests
    {
        private readonly Mock<IPostRepository> _repositoryMock = new();

        /// <summary>
        /// Determines if <see cref="PostsController.GetPosts"/> works successfully
        /// </summary>
        [TestMethod]
        public async Task GetPosts_Success()
        {
            //  Arrange
            IEnumerable<Post> posts = new[]
            {
                new Post { PostId = 1, Title = "Testing Post" }
            };

            _repositoryMock.Setup(repo => repo.GetPostsAsync())
                .ReturnsAsync(posts)
                .Verifiable();

            PostsController controller = new(_repositoryMock.Object);

            //  Act
            IEnumerable<Post> result = await controller.GetPosts();

            //  Assert
            Assert.AreEqual(posts, result, $"{nameof(PostsController.GetPosts)} returned an unexpected result.");
            _repositoryMock.Verify();
        }

        [TestMethod]
        public async Task GetPost_Success()
        {
            //  Arrange
            const int PostId = 1;
            Post post = new() { PostId = PostId, Title = "Testing Post" };

            _repositoryMock.Setup(repo => repo.GetPostAsync(PostId))
                .ReturnsAsync(post)
                .Verifiable();

            PostsController controller = new(_repositoryMock.Object);

            //  Act
            ActionResult<Post> result = await controller.GetPost(PostId);

            //  Assert
            Assert.IsNotNull(result, $"{nameof(PostsController.GetPost)} return a null object.");
            Assert.AreEqual(post, result.Value, $"{nameof(PostsController.GetPost)} retuned an unexpected post object.");
            Assert.IsNull(result.Result, $"{nameof(PostsController.GetPost)} retuned an action result with a result object instead of a value object");
            _repositoryMock.Verify();
        }

        [TestMethod]
        public async Task GetPost_ReturnsNotFoundResult()
        {
            //  Arrange
            const int PostId = 1;

            _repositoryMock.Setup(repo => repo.GetPostAsync(PostId))
                .ReturnsAsync(default(Post))
                .Verifiable();

            PostsController controller = new(_repositoryMock.Object);

            //  Act
            ActionResult<Post> result = await controller.GetPost(PostId);

            //  Assert
            Assert.IsNotNull(result, $"{nameof(PostsController.GetPost)} return a null action result object.");
            Assert.IsNull(result.Value, $"{nameof(PostsController.GetPost)} retuned an unexpected post object instead of null.");
            Assert.IsNotNull(result.Result, $"{nameof(PostsController.GetPost)} retuned an action result with a result object that is null istead of a not found result");
            Assert.IsInstanceOfType(result.Result, typeof(NotFoundObjectResult), $"{nameof(PostsController.GetPost)} did not return an action result object with type of {nameof(NotFoundObjectResult)}");
            _repositoryMock.Verify();
        }

        [TestMethod]
        public async Task AddPost_Success()
        {
            //  Arrange
            const int PostId = 1;
            Post post = new() { PostId = PostId, Title = "Testing Post" };

            _repositoryMock.Setup(repo => repo.AddPostAsync(post))
                .ReturnsAsync(post)
                .Verifiable();

            PostsController controller = new(_repositoryMock.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext
                    {
                        User = new ClaimsPrincipal(new Mock<IIdentity>().Object) 
                    }
                }
            };
            

            //  Act
            ActionResult<Post> result = await controller.AddPost(post);

            //  Assert
            Assert.IsNotNull(result, $"{nameof(PostsController.AddPost)} returned a null action result object.");
            Assert.IsNull(result.Value, $"{nameof(PostsController.AddPost)} retuned an unexpected post object instead of null.");
            Assert.IsNotNull(result.Result, $"{nameof(PostsController.AddPost)} retuned an action result with a result object that is null istead of a created at action object");
            Assert.IsInstanceOfType(result.Result, typeof(CreatedAtActionResult), $"{nameof(PostsController.AddPost)} did not return an action result object with type of {nameof(CreatedAtActionResult)}");

            CreatedAtActionResult createdResult = result.Result as CreatedAtActionResult;

            StringAssert.EndsWith(
                createdResult.ActionName,
                nameof(PostsController.GetPost),
                $"{nameof(PostsController.AddPost)} returned a created at action result with a wrong action name",
                StringComparison.OrdinalIgnoreCase);
            Assert.AreEqual(createdResult.RouteValues.Count, 1, $"{nameof(PostsController.AddPost)} returned more than 1 route value");
            Assert.AreEqual(createdResult.RouteValues["id"], PostId, $"{nameof(PostsController.AddPost)} returned an unexpected Post ID in the route values");
            Assert.AreEqual(createdResult.Value, post, $"{nameof(PostsController.AddPost)} did not returned a created at action result with the added post");
            _repositoryMock.Verify();
        }

        [TestMethod]
        public async Task UpdatePost_Success()
        {
            //  Arrange
            Post post = new Post
            {
                PostId = 1,
                Title = "Hello, World!",
            };

            _repositoryMock.Setup(repo => repo.UpdatePostAsync(post))
                .ReturnsAsync(post)
                .Verifiable();

            PostsController controller = new(_repositoryMock.Object);

            //  Act
            ActionResult<Post> result = await controller.UpdatePost(post);

            //  Assert
            Assert.IsNotNull(result, $"{nameof(PostsController.UpdatePost)} returned null object.");
            Assert.IsNull(result.Result, $"{nameof(PostsController.UpdatePost)} returned an action result instead of an object result.");
            Assert.IsNotNull(result.Value, $"{nameof(PostsController.UpdatePost)} returned a null as an object result.");
            Assert.AreEqual(result.Value, post, $"{nameof(PostsController.UpdatePost)} retuned an unexpected value object.");
            _repositoryMock.Verify();
        }

        [TestMethod]
        public async Task DeletePost_Success()
        {
            //  Arrange
            Post post = new Post
            {
                PostId = 1,
                Title = "Hello, World!",
            };

            _repositoryMock.Setup(repo => repo.DeletePostAsync(post.PostId))
                .ReturnsAsync(post)
                .Verifiable();

            PostsController controller = new(_repositoryMock.Object);

            //  Act
            ActionResult<Post> result = await controller.DeletePost(post.PostId);

            //  Assert
            Assert.IsNotNull(result, $"{nameof(PostsController.DeletePost)} returned null object.");
            Assert.IsNull(result.Result, $"{nameof(PostsController.DeletePost)} returned an action result instead of an object result.");
            Assert.IsNotNull(result.Value, $"{nameof(PostsController.DeletePost)} returned a null as an object result.");
            Assert.AreEqual(result.Value, post, $"{nameof(PostsController.DeletePost)} retuned an unexpected value object.");
        }
    }
}
