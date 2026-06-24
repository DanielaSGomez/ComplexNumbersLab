using ComplexNumbers.Application.DTOs;
using ComplexNumbers.Domain;

namespace ComplexNumbers.Application.Services
{
    public interface IOperationsService
    {
        ComplexNumbersDTO Sum(ComplexRequestDTO complexRequestDTO);
        ComplexNumbersDTO Substract(ComplexRequestDTO complexRequestDTO);
        ComplexNumbersDTO Multiply(ComplexRequestDTO complexRequestDTO);
        ComplexNumbersDTO Divide(ComplexRequestDTO complexRequestDTO);
    }
}
