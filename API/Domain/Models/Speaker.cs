using System.Collections.Generic;

namespace Angular.API.Domain.Models
{
    public class Speaker
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ShortResume { get; set; }

        public string Photo { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public List<SocialMedia> SocialMedias { get; set; }

        public List<SpeakerEvent> SpeakerEvents { get; set; }
    }
}
