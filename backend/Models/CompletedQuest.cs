using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartCareerRoadmap.API.Models;

[Table("completed_quests")]
public class CompletedQuest
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("user_id")]
    public Guid UserId { get; set; }

    [Column("role_id")]
    public Guid RoleId { get; set; }

    [Column("completed_at")]
    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    [ForeignKey("UserId")]
    public User User { get; set; } = null!;

    [ForeignKey("RoleId")]
    public CareerRole CareerRole { get; set; } = null!;
}
