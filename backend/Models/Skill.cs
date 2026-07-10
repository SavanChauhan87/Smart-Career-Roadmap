using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartCareerRoadmap.API.Models;

[Table("skills")]
public class Skill
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("name")]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Column("category")]
    [MaxLength(50)]
    public string Category { get; set; } = string.Empty;

    // Navigation properties
    public ICollection<UserSkill> UserSkills { get; set; } = new List<UserSkill>();
    public ICollection<RoleRequirement> RoleRequirements { get; set; } = new List<RoleRequirement>();
    public ICollection<LearningResource> LearningResources { get; set; } = new List<LearningResource>();
}
