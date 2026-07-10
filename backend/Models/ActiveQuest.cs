using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartCareerRoadmap.API.Models;

[Table("active_quests")]
public class ActiveQuest
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("user_id")]
    public Guid UserId { get; set; }

    [Column("role_id")]
    public Guid RoleId { get; set; }

    [Column("progress_percent")]
    public int ProgressPercent { get; set; } = 0;

    [Column("is_completed")]
    public bool IsCompleted { get; set; } = false;

    // Navigation properties
    [ForeignKey("UserId")]
    public User User { get; set; } = null!;

    [ForeignKey("RoleId")]
    public CareerRole CareerRole { get; set; } = null!;
}
