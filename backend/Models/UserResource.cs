using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartCareerRoadmap.API.Models;

[Table("user_resources")]
public class UserResource
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("user_id")]
    public Guid UserId { get; set; }

    [Column("resource_id")]
    public Guid ResourceId { get; set; }

    [Column("is_completed")]
    public bool IsCompleted { get; set; } = false;

    [Column("completed_at")]
    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    [ForeignKey("UserId")]
    public User User { get; set; } = null!;

    [ForeignKey("ResourceId")]
    public LearningResource Resource { get; set; } = null!;
}
