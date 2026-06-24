using AutoMapper;
using ComplexNumbers.Application.DTOs;
using ComplexNumbers.Application.Helpers;
using ComplexNumbers.Domain;

namespace ComplexNumbers.Application.Services
{
    public class OperationsService : IOperationsService
    {
        private readonly IMapper _mapper;
        public OperationsService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public ComplexNumbersDTO Divide(ComplexRequestDTO complexRequestDTO)
        {
            var (a, b) = ConvertToDomainComplex(complexRequestDTO);

            var result = Divide(a, b);

            return _mapper.Map<ComplexNumbersDTO>(result);
        }

        private ComplexNumber Divide(ComplexNumber a, ComplexNumber b)
        {
            var conjugateB = ComplexHelpers.Conjugate(b);

            var numerator = Multiply(a, conjugateB);
            var denominator = Multiply(b, conjugateB);

            return new ComplexNumber(
                numerator.Real / denominator.Real,
                numerator.Imaginary / denominator.Real
            );
        }

        private ComplexNumber Multiply(ComplexNumber a, ComplexNumber b)
        {
            return new ComplexNumber(
                a.Real * b.Real - a.Imaginary * b.Imaginary,
                a.Real * b.Imaginary + a.Imaginary * b.Real
            );
        }

        public ComplexNumbersDTO Multiply(ComplexRequestDTO complexRequestDTO)
        {
            var (a, b) = ConvertToDomainComplex(complexRequestDTO);

            var resultReal = a.Real * b.Real - a.Imaginary * b.Imaginary;
            var resultImaginary = a.Real * b.Imaginary + a.Imaginary * b.Real;

            var result = new ComplexNumber(resultReal, resultImaginary);
            return _mapper.Map<ComplexNumbersDTO>(result);
        }

        public ComplexNumbersDTO Substract(ComplexRequestDTO complexRequestDTO)
        {
            var (a, b) = ConvertToDomainComplex(complexRequestDTO);

            var result = new ComplexNumber(a.Real - b.Real, a.Imaginary - b.Imaginary);

            return _mapper.Map<ComplexNumbersDTO>(result);
        }

        public ComplexNumbersDTO Sum(ComplexRequestDTO complexRequestDTO)
        {
            var (a, b) = ConvertToDomainComplex(complexRequestDTO);

            var result = new ComplexNumber(a.Real + b.Real, a.Imaginary + b.Imaginary);

            return _mapper.Map<ComplexNumbersDTO>(result);

        }

        private (ComplexNumber a, ComplexNumber b) ConvertToDomainComplex(ComplexRequestDTO complexRequestDTO)
        {
            var a = _mapper.Map<ComplexNumber>(complexRequestDTO.First);
            var b = _mapper.Map<ComplexNumber>(complexRequestDTO.Second);

            return (a, b);
        }
    }
}
