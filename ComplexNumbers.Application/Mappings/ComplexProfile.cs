using AutoMapper;
using ComplexNumbers.Application.DTOs;
using ComplexNumbers.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplexNumbers.Application.Mappings
{
    public class ComplexProfile : Profile
    {
        public ComplexProfile()
        {
            CreateMap<ComplexNumber, ComplexNumbersDTO>().ReverseMap();               
        }
    }
}
