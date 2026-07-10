using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCareerRoadmap.API.Data;
using SmartCareerRoadmap.API.DTOs;

namespace SmartCareerRoadmap.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResourcesController : ControllerBase
{
    private readonly AppDbContext _db;

    public ResourcesController(AppDbContext db) => _db = db;

    /// <summary>GET /api/resources — list all learning resources, optionally filtered by skill name</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? skill = null)
    {
        var query = _db.LearningResources
            .Include(lr => lr.Skill)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(skill))
        {
            query = query.Where(lr => lr.Skill.Name.ToLower().Contains(skill.ToLower()));
        }

        var resources = await query.OrderBy(lr => lr.Skill.Name).ThenBy(lr => lr.Title).ToListAsync();

        // Group by skill name (matching frontend's resourcesCatalog shape)
        var grouped = resources
            .GroupBy(r => r.Skill.Name)
            .ToDictionary(
                g => g.Key,
                g => g.Select(r => new ResourceDto
                {
                    Title = r.Title,
                    Platform = r.Platform,
                    Url = r.Url,
                    Duration = r.Duration,
                    Cost = r.Cost,
                    SkillName = r.Skill.Name
                }).ToList()
            );

        return Ok(grouped);
    }
}
