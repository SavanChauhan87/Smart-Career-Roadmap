using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartCareerRoadmap.API.Models;

[Table("user_achievements")]
public class UserAchievement
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("user_id")]
    public Guid UserId { get; set; }

    [Column("achievement_key")]
    [MaxLength(100)]
    public string AchievementKey { get; set; } = string.Empty;

    [Column("unlocked_at")]
    public DateTime UnlockedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    [ForeignKey("UserId")]
    public User User { get; set; } = null!;
}
