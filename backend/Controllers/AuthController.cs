using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SmartCareerRoadmap.API.Data;
using SmartCareerRoadmap.API.DTOs;
using SmartCareerRoadmap.API.Models;

namespace SmartCareerRoadmap.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    /// <summary>POST /api/auth/login</summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        var user = await _db.Users
            .Include(u => u.UserAchievements)
            .FirstOrDefaultAsync(u => u.Email == req.Email);

        if (user == null)
            return Unauthorized(new { message = "Invalid email or password." });

        // Verify password hash
        bool valid = BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash);
        if (!valid)
            return Unauthorized(new { message = "Invalid email or password." });

        // Generate JWT token
        var token = GenerateJwt(user);

        // Calculate MaxXP for the current level
        int maxXp = CalculateMaxXp(user.Level);

        return Ok(new AuthResponse
        {
            Token = token,
            User = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Level = user.Level,
                Xp = user.Xp,
                MaxXp = maxXp,
                Streak = user.Streak,
                BadgesEarned = user.UserAchievements.Count
            }
        });
    }

    /// <summary>POST /api/auth/register</summary>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest req)
    {
        if (await _db.Users.AnyAsync(u => u.Email == req.Email))
            return Conflict(new { message = "Email already registered." });

        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = req.Name,
            Email = req.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
            Level = 1,
            Xp = 0,
            Streak = 0
        };

        _db.Users.Add(user);

        // Auto-create user_skills entries (level 0) for all skills
        var allSkills = await _db.Skills.ToListAsync();
        foreach (var skill in allSkills)
        {
            _db.UserSkills.Add(new UserSkill
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                SkillId = skill.Id,
                Level = 0
            });
        }

        await _db.SaveChangesAsync();

        var token = GenerateJwt(user);

        return CreatedAtAction(nameof(Login), new AuthResponse
        {
            Token = token,
            User = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Level = 1,
                Xp = 0,
                MaxXp = 3000,
                Streak = 0,
                BadgesEarned = 0
            }
        });
    }

    private string GenerateJwt(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? "SmartCareerRoadmapSuperSecretKey2026!"));

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name)
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"] ?? "SmartCareerRoadmap",
            audience: _config["Jwt:Audience"] ?? "SmartCareerRoadmap",
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static int CalculateMaxXp(int level)
    {
        // Base 3000 XP, scales 1.25x per level
        int maxXp = 3000;
        for (int i = 1; i < level; i++)
            maxXp = (int)Math.Round(maxXp * 1.25);
        return maxXp;
    }
}
