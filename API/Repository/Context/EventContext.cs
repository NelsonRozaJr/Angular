using Angular.API.Domain.Identity;
using Angular.API.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Angular.API.Repository.Context
{
    public class EventContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public EventContext(DbContextOptions<EventContext> options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<SocialMedia> SocialMedias { get; set; }

        public DbSet<Speaker> Speakers { get; set; }

        public DbSet<SpeakerEvent> SpeakerEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(ur => ur.UserRoles)
                    .HasForeignKey(k => k.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(ur => ur.UserRoles)
                    .HasForeignKey(k => k.UserId)
                    .IsRequired();
            });

            modelBuilder.Entity<SpeakerEvent>()
                .HasKey(p => new { p.EventId, p.SpeakerId });
        }
    }
}
