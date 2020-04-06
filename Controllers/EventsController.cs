using Angular.API.Domain.Models;
using Angular.API.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Angular.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : Controller
    {
        private readonly IEventRepository _eventRepository;
        private readonly IRepository _repository;

        public EventsController(IEventRepository eventRepository, IRepository repository)
        {
            _eventRepository = eventRepository;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _eventRepository.GetAllAsync(true);
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
                var result = await _eventRepository.GetByIdAsync(id, true);
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
                var result = await _eventRepository.GetByTopicAsync(topic, true);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Event model)
        {
            try
            {
                _repository.Add(model);
                if (await _repository.SaveChangesAsync())
                {
                    return Created($"/api/events/{ model.Id }", model);
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
        public async Task<IActionResult> Put(int id, Event model)
        {
            try
            {
                var _event = await _eventRepository.GetByIdAsync(id);
                if (_event == null)
                {
                    return NotFound();
                }

                _repository.Update(model);
                if (await _repository.SaveChangesAsync())
                {
                    return Created($"/api/events/{ model.Id }", model);
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