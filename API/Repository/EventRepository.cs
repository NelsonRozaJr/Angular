using Angular.API.Domain.Models;
using Angular.API.Repository.Context;
using Angular.API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular.API.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly EventContext _context;

        public EventRepository(EventContext context)
        {
            _context = context;
        }

        public async Task<List<Event>> GetAllAsync(bool includeSpeaker = false)
        {
            IQueryable<Event> query = _context.Events
                .Include(i => i.Groups)
                .Include(i => i.SocialMedias);

            if (includeSpeaker)
            {
                query = query
                    .Include(i => i.SpeakerEvents)
                    .ThenInclude(i => i.Speaker);
            }

            query = query.AsNoTracking()
                .OrderByDescending(q => q.Date);

            return await query.ToListAsync();
        }

        public async Task<Event> GetByIdAsync(int id, bool includeSpeaker = false)
        {
            IQueryable<Event> query = _context.Events
                .Include(i => i.Groups)
                .Include(i => i.SocialMedias);

            if (includeSpeaker)
            {
                query = query
                    .Include(i => i.SpeakerEvents)
                    .ThenInclude(i => i.Speaker);
            }

            query = query.AsNoTracking()
                .Where(q => q.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<List<Event>> GetByTopicAsync(string topic, bool includeSpeaker = false)
        {
            IQueryable<Event> query = _context.Events
                .Include(i => i.Groups)
                .Include(i => i.SocialMedias);

            if (includeSpeaker)
            {
                query = query
                    .Include(i => i.SpeakerEvents)
                    .ThenInclude(i => i.Speaker);
            }

            query = query.AsNoTracking()
                .Where(q => q.Topic.ToLower().Contains(topic.ToLower()))
                .OrderByDescending(q => q.Date);

            return await query.ToListAsync();
        }
    }
}
