using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Angular.API.DTOs
{
    public class SpeakerDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ShortResume { get; set; }

        public string Photo { get; set; }

        public string Phone { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public List<SocialMediaDTO> SocialMedias { get; set; }

        public List<EventDTO> Events { get; set; }
    }
}
