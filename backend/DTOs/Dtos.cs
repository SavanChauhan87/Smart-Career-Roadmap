namespace SmartCareerRoadmap.API.DTOs;

// ── Auth ───────────────────────────────────────────────────
public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class RegisterRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class AuthResponse
{
    public string Token { get; set; } = string.Empty;
    public UserDto User { get; set; } = null!;
}

// ── User ───────────────────────────────────────────────────
public class UserDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Level { get; set; }
    public int Xp { get; set; }
    public int MaxXp { get; set; }
    public int Streak { get; set; }
    public int BadgesEarned { get; set; }
    public string? Bio { get; set; }
    public string? GithubUrl { get; set; }
    public string? LinkedinUrl { get; set; }
}

public class UserUpdateRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? GithubUrl { get; set; }
    public string? LinkedinUrl { get; set; }
}

// ── Skills ─────────────────────────────────────────────────
public class SkillDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Level { get; set; }
    public string Category { get; set; } = string.Empty;
}

public class SkillUpdateRequest
{
    public int Level { get; set; }
}

// ── Careers ────────────────────────────────────────────────
public class CareerRoleDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Demand { get; set; } = string.Empty;
    public string Salary { get; set; } = string.Empty;
    public List<RoleRequirementDto> Requirements { get; set; } = new();
}

public class RoleRequirementDto
{
    public string Skill { get; set; } = string.Empty;
    public int Importance { get; set; }
}

// ── Quests ─────────────────────────────────────────────────
public class QuestDto
{
    public Guid RoleId { get; set; }
    public string RoleName { get; set; } = string.Empty;
    public int ProgressPercent { get; set; }
    public bool IsCompleted { get; set; }
}

public class QuestRequest
{
    public Guid RoleId { get; set; }
}

// ── Resources ──────────────────────────────────────────────
public class ResourceDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Platform { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string? Duration { get; set; }
    public string? Cost { get; set; }
    public string SkillName { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}

public class ResourceProgressRequest
{
    public bool IsCompleted { get; set; }
}

// ── Achievements ───────────────────────────────────────────
public class AchievementDto
{
    public string AchievementKey { get; set; } = string.Empty;
    public DateTime? UnlockedAt { get; set; }
}

public class UnlockAchievementRequest
{
    public string AchievementKey { get; set; } = string.Empty;
}
