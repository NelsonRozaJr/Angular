using Angular.API.Domain.Identity;
using Angular.API.Domain.Models;
using Angular.API.DTOs;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Event, EventDTO>()
                .ForMember(dst => dst.Speakers, opt =>
                {
                    opt.MapFrom(src => src.SpeakerEvents.Select(s => s.Speaker).ToList());
                })
                .ReverseMap();

            CreateMap<Group, GroupDTO>()
                .ReverseMap();

            CreateMap<SocialMedia, SocialMediaDTO>()
                .ReverseMap();

            CreateMap<Speaker, SpeakerDTO>()
                .ForMember(dst => dst.Events, opt =>
                {
                    opt.MapFrom(src => src.SpeakerEvents.Select(s => s.Event).ToList());
                })
                .ReverseMap();

            CreateMap<User, UserDTO>()
                .ReverseMap();

            CreateMap<User, UserLoginDTO>()
                .ReverseMap();
        }
    }
}
