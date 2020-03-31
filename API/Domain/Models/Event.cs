using System;
using System.Collections.Generic;

namespace Angular.API.Domain.Models
{
    public class Event
    {
        public int Id { get; set; }

        public string City { get; set; }

        public string Topic { get; set; }

        public int Subscribers { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public DateTime Date { get; set; }

        public List<Group> Groups { get; set; }

        public List<SocialMedia> SocialMedias { get; set; }

        public List<SpeakerEvent> SpeakerEvents { get; set; }
    }
}