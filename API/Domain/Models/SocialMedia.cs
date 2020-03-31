namespace Angular.API.Domain.Models
{
    public class SocialMedia
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string URL { get; set; }

        public int? EventId { get; set; }

        public int? SpeakerId { get; set; }

        public Event Event { get; }

        public Speaker Speaker { get; }
    }
}