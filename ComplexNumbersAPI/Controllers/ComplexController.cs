using ComplexNumbers.Application.DTOs;
using ComplexNumbers.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace ComplexNumbersAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplexController : ControllerBase
    {
        private readonly IOperationsService _operationsService;
        public ComplexController(IOperationsService operationsService)
        {
            _operationsService = operationsService;
        }

        [HttpPost("add")]
        public IActionResult Add([FromBody] ComplexRequestDTO complexNumbers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = _operationsService.Sum(complexNumbers);

            return Ok(result);
        }

        [HttpPost("substract")]
        public IActionResult Substract([FromBody] ComplexRequestDTO complexNumbers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = _operationsService.Substract(complexNumbers);

            return Ok(result);
        }

        [HttpPost("divide")]
        public IActionResult Divide([FromBody] ComplexRequestDTO complexNumbers)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = _operationsService.Divide(complexNumbers);

            return Ok(result);
        }

        [HttpPost("multiply")]
        public IActionResult Multiply([FromBody] ComplexRequestDTO complexNumbers)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = _operationsService.Multiply(complexNumbers);

            return Ok(result);
        }
    }
}
