using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartCareerRoadmap.API.Models;

[Table("role_requirements")]
public class RoleRequirement
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("role_id")]
    public Guid RoleId { get; set; }

    [Column("skill_id")]
    public Guid SkillId { get; set; }

    [Column("importance")]
    public int Importance { get; set; } = 3;

    // Navigation properties
    [ForeignKey("RoleId")]
    public CareerRole CareerRole { get; set; } = null!;

    [ForeignKey("SkillId")]
    public Skill Skill { get; set; } = null!;
}
