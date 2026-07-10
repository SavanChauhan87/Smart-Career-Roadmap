using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartCareerRoadmap.API.Models;

[Table("career_roles")]
public class CareerRole
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("name")]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Column("demand")]
    [MaxLength(50)]
    public string Demand { get; set; } = string.Empty;

    [Column("salary_range")]
    [MaxLength(50)]
    public string SalaryRange { get; set; } = string.Empty;

    // Navigation properties
    public ICollection<RoleRequirement> RoleRequirements { get; set; } = new List<RoleRequirement>();
}
