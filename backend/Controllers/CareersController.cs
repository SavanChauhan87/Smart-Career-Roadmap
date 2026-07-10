using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCareerRoadmap.API.Data;
using SmartCareerRoadmap.API.DTOs;

namespace SmartCareerRoadmap.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CareersController : ControllerBase
{
    private readonly AppDbContext _db;

    public CareersController(AppDbContext db) => _db = db;

    /// <summary>GET /api/careers — list all career roles with their skill requirements</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var roles = await _db.CareerRoles
            .Include(cr => cr.RoleRequirements)
                .ThenInclude(rr => rr.Skill)
            .OrderBy(cr => cr.Name)
            .ToListAsync();

        var result = roles.Select(r => new CareerRoleDto
        {
            Id = r.Id,
            Name = r.Name,
            Demand = r.Demand,
            Salary = r.SalaryRange,
            Requirements = r.RoleRequirements.Select(rr => new RoleRequirementDto
            {
                Skill = rr.Skill.Name,
                Importance = rr.Importance
            }).ToList()
        }).ToList();

        return Ok(result);
    }

    /// <summary>GET /api/careers/{id} — get a single career role</summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var role = await _db.CareerRoles
            .Include(cr => cr.RoleRequirements)
                .ThenInclude(rr => rr.Skill)
            .FirstOrDefaultAsync(cr => cr.Id == id);

        if (role == null)
            return NotFound();

        return Ok(new CareerRoleDto
        {
            Id = role.Id,
            Name = role.Name,
            Demand = role.Demand,
            Salary = role.SalaryRange,
            Requirements = role.RoleRequirements.Select(rr => new RoleRequirementDto
            {
                Skill = rr.Skill.Name,
                Importance = rr.Importance
            }).ToList()
        });
    }
}
