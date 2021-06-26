using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace MyBlog.Models
{
    /// <summary>
    /// Indidual post of my blog
    /// </summary>
    public class Post
    {
        /// <summary>
        /// Primary identifier of the post
        /// </summary>
        [Key]
        [Display(Name = "Post ID")]
        public int PostId { get; set; }

        /// <summary>
        /// Title of the post 
        /// </summary>
        [Required]
        [StringLength(400)]
        [Display(Name = "Title")]
        public string? Title { get; set; }

        /// <summary>
        /// Sub title to the post
        /// </summary>
        [StringLength(400)]
        [Display(Name = "Sub Title")]
        public string? SubTitle { get; set; }

        /// <summary>
        /// Content of the post
        /// </summary>
        [Required]
        [Display(Name = "Content")]
        public string? Content { get; set; }

        /// <summary>
        /// Create date and time of the post
        /// </summary>
        [Display(Name = "Create Date")]
        public DateTime CreateDate { get; set; }

        /// <summary>
        /// Last date and time that the post was modified
        /// </summary>
        [Display(Name = "Modify Date")]
        public DateTime ModifyDate { get; set; }

        /// <summary>
        /// Determines if post is available in the blog to the general public
        /// </summary>
        [Required]
        [Display(Name = "Visible")]
        public bool Visible { get; set; }

        /// <summary>
        /// Original auther of the post
        /// </summary>
        [Display(Name = "Created By")]
        public string? CreatedBy { get; set; }

        /// <summary>
        /// Serializes post object as a JSON in a string
        /// </summary>
        /// <returns>JSON string</returns>
        public override string ToString() => JsonSerializer.Serialize(this);
    }
}
