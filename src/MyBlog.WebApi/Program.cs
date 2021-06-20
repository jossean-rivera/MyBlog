using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MyBlog.Data;
using MyBlog.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace MyBlog.WebApi
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // Get the IWebHost which will host this application.
            IHost host = CreateHostBuilder(args).Build();

            // Create scope since repository is a scoped service.
            using (IServiceScope scope = host.Services.CreateScope())
            {
                // Get the instance of repository
                IServiceProvider services = scope.ServiceProvider;
                IPostRepository repository = services.GetRequiredService<IPostRepository>();

                try
                {
                    // Seed repository
                    await SeedRepositoryAsync(repository);
                }
                catch
                {
                    Debug.WriteLine("Failed to seed database");
                }
            }

            // Continue to run the application
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

        //  Seeds repository
        private static async Task SeedRepositoryAsync(IPostRepository repository)
        {
            IEnumerable<Post> posts = await repository.GetPostsAsync();

            if (!posts.Any())
            {
                await repository.AddPostAsync(new Post
                {
                    Title = "Hello, World in C#",
                    SubTitle = "Start coding now in C#",
                    Content = string.Empty,
                    Visible = true,
                    CreatedBy = "jossean.rivera@outlook.com"
                });

                await repository.AddPostAsync(new Post
                {
                    Title = "Object-Oriented Programming with C++",
                    SubTitle = "Learn OOP",
                    Content = string.Empty,
                    Visible = true,
                    CreateDate = DateTime.Now,
                    ModifyDate = DateTime.Now,
                    CreatedBy = "jossean.rivera@outlook.com"
                });
            }
        }
    }
}
