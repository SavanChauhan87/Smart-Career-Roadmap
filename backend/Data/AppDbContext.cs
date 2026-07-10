using Microsoft.EntityFrameworkCore;
using SmartCareerRoadmap.API.Models;

namespace SmartCareerRoadmap.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<UserSkill> UserSkills => Set<UserSkill>();
    public DbSet<CareerRole> CareerRoles => Set<CareerRole>();
    public DbSet<RoleRequirement> RoleRequirements => Set<RoleRequirement>();
    public DbSet<ActiveQuest> ActiveQuests => Set<ActiveQuest>();
    public DbSet<LearningResource> LearningResources => Set<LearningResource>();
    public DbSet<UserAchievement> UserAchievements => Set<UserAchievement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ── Users ──────────────────────────────────────────────
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.Email).IsUnique();
        });

        // ── UserSkills ─────────────────────────────────────────
        modelBuilder.Entity<UserSkill>(entity =>
        {
            entity.HasIndex(e => new { e.UserId, e.SkillId }).IsUnique();

            entity.HasOne(us => us.User)
                  .WithMany(u => u.UserSkills)
                  .HasForeignKey(us => us.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(us => us.Skill)
                  .WithMany(s => s.UserSkills)
                  .HasForeignKey(us => us.SkillId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ── RoleRequirements ───────────────────────────────────
        modelBuilder.Entity<RoleRequirement>(entity =>
        {
            entity.HasIndex(e => new { e.RoleId, e.SkillId }).IsUnique();

            entity.HasOne(rr => rr.CareerRole)
                  .WithMany(cr => cr.RoleRequirements)
                  .HasForeignKey(rr => rr.RoleId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(rr => rr.Skill)
                  .WithMany(s => s.RoleRequirements)
                  .HasForeignKey(rr => rr.SkillId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ── ActiveQuests ───────────────────────────────────────
        modelBuilder.Entity<ActiveQuest>(entity =>
        {
            entity.HasIndex(e => e.UserId).IsUnique();

            entity.HasOne(aq => aq.User)
                  .WithOne(u => u.ActiveQuest)
                  .HasForeignKey<ActiveQuest>(aq => aq.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(aq => aq.CareerRole)
                  .WithMany()
                  .HasForeignKey(aq => aq.RoleId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ── LearningResources ──────────────────────────────────
        modelBuilder.Entity<LearningResource>(entity =>
        {
            entity.HasOne(lr => lr.Skill)
                  .WithMany(s => s.LearningResources)
                  .HasForeignKey(lr => lr.SkillId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ── UserAchievements ───────────────────────────────────
        modelBuilder.Entity<UserAchievement>(entity =>
        {
            entity.HasIndex(e => new { e.UserId, e.AchievementKey }).IsUnique();

            entity.HasOne(ua => ua.User)
                  .WithMany(u => u.UserAchievements)
                  .HasForeignKey(ua => ua.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
