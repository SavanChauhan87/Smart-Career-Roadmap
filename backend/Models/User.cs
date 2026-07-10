using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartCareerRoadmap.API.Models;

[Table("users")]
public class User
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("name")]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Column("email")]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [Column("password_hash")]
    [MaxLength(255)]
    public string PasswordHash { get; set; } = string.Empty;

    [Column("level")]
    public int Level { get; set; } = 1;

    [Column("xp")]
    public int Xp { get; set; } = 0;

    [Column("streak")]
    public int Streak { get; set; } = 0;

    [Column("last_active")]
    public DateTime LastActive { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public ICollection<UserSkill> UserSkills { get; set; } = new List<UserSkill>();
    public ActiveQuest? ActiveQuest { get; set; }
    public ICollection<UserAchievement> UserAchievements { get; set; } = new List<UserAchievement>();
}
