// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MyBlog.Data;

namespace MyBlog.Data.Migrations
{
    [DbContext(typeof(MyBlogDbContext))]
    [Migration("20210620013209_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.7");

            modelBuilder.Entity("MyBlog.Models.Post", b =>
                {
                    b.Property<int>("PostId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("ModifyDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("SubTitle")
                        .HasMaxLength(400)
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(400)
                        .HasColumnType("TEXT");

                    b.Property<bool>("Visible")
                        .HasColumnType("INTEGER");

                    b.HasKey("PostId");

                    b.ToTable("Posts");
                });
#pragma warning restore 612, 618
        }
    }
}
