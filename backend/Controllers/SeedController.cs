using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCareerRoadmap.API.Data;
using SmartCareerRoadmap.API.Models;

namespace SmartCareerRoadmap.API.Controllers;

/// <summary>
/// Development-only controller to re-seed database with properly hashed passwords.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class SeedController : ControllerBase
{
    private readonly AppDbContext _db;

    public SeedController(AppDbContext db) => _db = db;

    /// <summary>POST /api/seed/fix-password — hash the seed user's password properly</summary>
    [HttpPost("fix-password")]
    public async Task<IActionResult> FixSeedPassword()
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == "savan@guild.com");
        if (user == null)
            return NotFound(new { message = "Seed user not found. Run init.sql first." });

        // Hash the known seed password
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123");
        await _db.SaveChangesAsync();

        return Ok(new { message = "Seed user password hash updated successfully.", email = user.Email });
    }
}
