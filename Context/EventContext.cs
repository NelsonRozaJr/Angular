using Angular.Models;
using Microsoft.EntityFrameworkCore;

namespace Angular.Context
{
    public class EventContext : DbContext
    {
        public EventContext(DbContextOptions<EventContext> options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
    }
}
