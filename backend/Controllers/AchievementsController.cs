using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCareerRoadmap.API.Data;
using SmartCareerRoadmap.API.DTOs;
using SmartCareerRoadmap.API.Models;

namespace SmartCareerRoadmap.API.Controllers;

[ApiController]
[Route("api/users/{userId:guid}/achievements")]
public class AchievementsController : ControllerBase
{
    private readonly AppDbContext _db;

    public AchievementsController(AppDbContext db) => _db = db;

    /// <summary>GET /api/users/{userId}/achievements — list all unlocked achievements</summary>
    [HttpGet]
    public async Task<IActionResult> GetUnlocked(Guid userId)
    {
        var achievements = await _db.UserAchievements
            .Where(ua => ua.UserId == userId)
            .OrderBy(ua => ua.UnlockedAt)
            .Select(ua => new AchievementDto
            {
                AchievementKey = ua.AchievementKey,
                UnlockedAt = ua.UnlockedAt
            })
            .ToListAsync();

        return Ok(achievements);
    }

    /// <summary>POST /api/users/{userId}/achievements — unlock a new achievement</summary>
    [HttpPost]
    public async Task<IActionResult> Unlock(Guid userId, [FromBody] UnlockAchievementRequest req)
    {
        var exists = await _db.UserAchievements
            .AnyAsync(ua => ua.UserId == userId && ua.AchievementKey == req.AchievementKey);

        if (exists)
            return Conflict(new { message = "Achievement already unlocked." });

        _db.UserAchievements.Add(new UserAchievement
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            AchievementKey = req.AchievementKey,
            UnlockedAt = DateTime.UtcNow
        });

        await _db.SaveChangesAsync();

        return Ok(new AchievementDto
        {
            AchievementKey = req.AchievementKey,
            UnlockedAt = DateTime.UtcNow
        });
    }
}
