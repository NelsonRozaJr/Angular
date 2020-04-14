using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Angular.API.DTOs
{
    public class EventDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "{0} must be between 3 and 100")]
        public string City { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        public string Topic { get; set; }

        [Range(2, 1000, ErrorMessage = "{0} must be between 2 and 1000")]
        public int Subscribers { get; set; }

        public string Phone { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public DateTime Date { get; set; }

        public string ImageFile { get; set; }

        public List<GroupDTO> Groups { get; set; }

        public List<SocialMediaDTO> SocialMedias { get; set; }

        public List<SpeakerDTO> Speakers { get; set; }
    }
}
