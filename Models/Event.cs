using System;

namespace Angular.Models
{
    public class Event
    {
        public int Id { get; set; }

        public string City { get; set; }

        public string Topic { get; set; }

        public int Subscribers { get; set; }

        public string Group { get; set; }

        public DateTime Date { get; set; }
    }
}