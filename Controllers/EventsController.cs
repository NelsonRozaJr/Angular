using Angular.API.Domain.Models;
using Angular.API.DTOs;
using Angular.API.Repository.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Angular.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : Controller
    {
        private readonly IEventRepository _eventRepository;
        private readonly IRepository _repository;
        private readonly IMapper _mapper;

        public EventsController(IEventRepository eventRepository, IRepository repository, IMapper mapper)
        {
            _eventRepository = eventRepository;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var events = await _eventRepository.GetAllAsync(true);
                var results = _mapper.Map<List<EventDTO>>(events);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var _event = await _eventRepository.GetByIdAsync(id, true);
                var result = _mapper.Map<EventDTO>(_event);

                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("topics/{topic}")]
        public async Task<IActionResult> Get(string topic)
        {
            try
            {
                var events = await _eventRepository.GetByTopicAsync(topic, true);
                var results = _mapper.Map<List<EventDTO>>(events);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(EventDTO model)
        {
            try
            {
                var _event = _mapper.Map<Event>(model);

                _repository.Add(_event);
                if (await _repository.SaveChangesAsync())
                {
                    return Created($"/api/events/{ _event.Id }", _event);
                }

                return BadRequest();
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Put(int id, EventDTO model)
        {
            try
            {
                var _event = await _eventRepository.GetByIdAsync(id);
                if (_event == null)
                {
                    return NotFound();
                }

                _mapper.Map(model, _event);

                _repository.Update(_event);
                if (await _repository.SaveChangesAsync())
                {
                    return Created($"/api/events/{ _event.Id }", _event);
                }

                return BadRequest();
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var currentEvent = await _eventRepository.GetByIdAsync(id);
                if (currentEvent == null)
                {
                    return NotFound();
                }

                _repository.Delete(currentEvent);
                if (await _repository.SaveChangesAsync())
                {
                    return Ok();
                }

                return BadRequest();
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}