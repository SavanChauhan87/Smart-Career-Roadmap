using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartCareerRoadmap.API.Models;

[Table("user_skills")]
public class UserSkill
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("user_id")]
    public Guid UserId { get; set; }

    [Column("skill_id")]
    public Guid SkillId { get; set; }

    [Column("level")]
    public int Level { get; set; } = 0;

    // Navigation properties
    [ForeignKey("UserId")]
    public User User { get; set; } = null!;

    [ForeignKey("SkillId")]
    public Skill Skill { get; set; } = null!;
}
