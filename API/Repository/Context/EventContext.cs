using Angular.API.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Angular.API.Repository.Context
{
    public class EventContext : DbContext
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
            modelBuilder.Entity<SpeakerEvent>()
                .HasKey(p => new { p.EventId, p.SpeakerId });

            base.OnModelCreating(modelBuilder);
        }
    }
}
