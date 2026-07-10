using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartCareerRoadmap.API.Models;

[Table("learning_resources")]
public class LearningResource
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("skill_id")]
    public Guid SkillId { get; set; }

    [Column("title")]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Column("platform")]
    [MaxLength(50)]
    public string Platform { get; set; } = string.Empty;

    [Column("url")]
    [MaxLength(255)]
    public string Url { get; set; } = string.Empty;

    [Column("duration")]
    [MaxLength(50)]
    public string? Duration { get; set; }

    [Column("cost")]
    [MaxLength(50)]
    public string? Cost { get; set; }

    // Navigation properties
    [ForeignKey("SkillId")]
    public Skill Skill { get; set; } = null!;
}
