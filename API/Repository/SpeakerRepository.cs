using Angular.API.Domain.Models;
using Angular.API.Repository.Context;
using Angular.API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular.API.Repository
{
    public class SpeakerRepository : ISpeakerRepository
    {
        private readonly EventContext _context;

        public SpeakerRepository(EventContext context)
        {
            _context = context;
        }

        public async Task<List<Speaker>> GetAllAsync(bool includeEvent = false)
        {
            IQueryable<Speaker> query = _context.Speakers
                .Include(i => i.SocialMedias);

            if (includeEvent)
            {
                query = query
                    .Include(i => i.SpeakerEvents)
                    .ThenInclude(i => i.Event);
            }

            query = query.AsNoTracking()
                .OrderBy(q => q.Name);

            return await query.ToListAsync();
        }

        public async Task<Speaker> GetByIdAsync(int id, bool includeEvent = false)
        {
            IQueryable<Speaker> query = _context.Speakers
                .Include(i => i.SocialMedias);

            if (includeEvent)
            {
                query = query
                    .Include(i => i.SpeakerEvents)
                    .ThenInclude(i => i.Event);
            }

            query = query.AsNoTracking()
                .Where(q => q.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<List<Speaker>> GetByNameAsync(string name, bool includeEvent = false)
        {
            IQueryable<Speaker> query = _context.Speakers
                .Include(i => i.SocialMedias);

            if (includeEvent)
            {
                query = query
                    .Include(i => i.SpeakerEvents)
                    .ThenInclude(i => i.Event);
            }

            query = query.AsNoTracking()
                .Where(q => q.Name.ToLower().Contains(name.ToLower()))
                .OrderBy(q => q.Name);

            return await query.ToListAsync();
        }
    }
}
