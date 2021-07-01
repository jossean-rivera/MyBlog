using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MyBlog.Data;
using MyBlog.Models;
using System;
using System.Diagnostics;
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
                MyBlogDbContext context = services.GetRequiredService<MyBlogDbContext>();

                try
                {
                    _ = await context.Database.EnsureCreatedAsync();

                    // Seed repository
                    await SeedRepositoryAsync(context);
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
        private static async Task SeedRepositoryAsync(MyBlogDbContext context)
        {
            if (!await context.Posts.AnyAsync())
            {
                context.Posts!.Add(new Post
                {
                    Title = "Hello, World in C#",
                    SubTitle = "Start coding now in C#",
                    Content = string.Empty,
                    Visible = true,
                    CreatedBy = "jossean.rivera@outlook.com"
                });

                context.Posts!.Add(new Post
                {
                    Title = "Object-Oriented Programming with C++",
                    SubTitle = "Learn OOP",
                    Content = string.Empty,
                    Visible = true,
                    CreateDate = DateTime.Now,
                    ModifyDate = DateTime.Now,
                    CreatedBy = "jossean.rivera@outlook.com"
                });

                await context.SaveChangesAsync();
            }
        }

    }
}
