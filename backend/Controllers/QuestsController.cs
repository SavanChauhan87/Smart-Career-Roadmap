using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCareerRoadmap.API.Data;
using SmartCareerRoadmap.API.DTOs;
using SmartCareerRoadmap.API.Models;

namespace SmartCareerRoadmap.API.Controllers;

[ApiController]
[Route("api/users/{userId:guid}/quest")]
public class QuestsController : ControllerBase
{
    private readonly AppDbContext _db;

    public QuestsController(AppDbContext db) => _db = db;

    /// <summary>GET /api/users/{userId}/quest — get the user's active quest</summary>
    [HttpGet]
    public async Task<IActionResult> GetActiveQuest(Guid userId)
    {
        var quest = await _db.ActiveQuests
            .Include(q => q.CareerRole)
            .FirstOrDefaultAsync(q => q.UserId == userId);

        if (quest == null)
            return Ok((QuestDto?)null); // No active quest

        return Ok(new QuestDto
        {
            RoleId = quest.RoleId,
            RoleName = quest.CareerRole.Name,
            ProgressPercent = quest.ProgressPercent,
            IsCompleted = quest.IsCompleted
        });
    }

    /// <summary>POST /api/users/{userId}/quest — set or change active quest</summary>
    [HttpPost]
    public async Task<IActionResult> SetActiveQuest(Guid userId, [FromBody] QuestRequest req)
    {
        var roleExists = await _db.CareerRoles.AnyAsync(r => r.Id == req.RoleId);
        if (!roleExists)
            return BadRequest(new { message = "Career role not found." });

        var existing = await _db.ActiveQuests.FirstOrDefaultAsync(q => q.UserId == userId);

        if (existing != null)
        {
            existing.RoleId = req.RoleId;
            existing.ProgressPercent = 0;
            existing.IsCompleted = false;
        }
        else
        {
            _db.ActiveQuests.Add(new ActiveQuest
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                RoleId = req.RoleId,
                ProgressPercent = 0,
                IsCompleted = false
            });
        }

        // Award XP for selecting a quest
        var user = await _db.Users.FindAsync(userId);
        if (user != null)
        {
            user.Xp += 200;
            int maxXp = CalculateMaxXp(user.Level);
            while (user.Xp >= maxXp)
            {
                user.Xp -= maxXp;
                user.Level += 1;
                maxXp = CalculateMaxXp(user.Level);
            }
        }

        await _db.SaveChangesAsync();

        var role = await _db.CareerRoles.FindAsync(req.RoleId);

        return Ok(new QuestDto
        {
            RoleId = req.RoleId,
            RoleName = role?.Name ?? "",
            ProgressPercent = 0,
            IsCompleted = false
        });
    }

    /// <summary>PUT /api/users/{userId}/quest — update quest progress</summary>
    [HttpPut]
    public async Task<IActionResult> UpdateProgress(Guid userId, [FromBody] QuestDto dto)
    {
        var quest = await _db.ActiveQuests
            .Include(q => q.CareerRole)
            .FirstOrDefaultAsync(q => q.UserId == userId);

        if (quest == null)
            return NotFound(new { message = "No active quest." });

        quest.ProgressPercent = Math.Clamp(dto.ProgressPercent, 0, 100);
        quest.IsCompleted = dto.IsCompleted || quest.ProgressPercent >= 100;

        await _db.SaveChangesAsync();

        return Ok(new QuestDto
        {
            RoleId = quest.RoleId,
            RoleName = quest.CareerRole.Name,
            ProgressPercent = quest.ProgressPercent,
            IsCompleted = quest.IsCompleted
        });
    }

    private static int CalculateMaxXp(int level)
    {
        int maxXp = 3000;
        for (int i = 1; i < level; i++)
            maxXp = (int)Math.Round(maxXp * 1.25);
        return maxXp;
    }
}
