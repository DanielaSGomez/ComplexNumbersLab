using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ComplexNumbers.Application.DTOs.ComplexNumbersDTO;

namespace ComplexNumbers.Application.DTOs
{
    public class ComplexNumbersDTO
    {      
            public double Real { get; set; }
            public double Imaginary { get; set; }        
    }

    public class ComplexRequestDTO
    {
        public ComplexNumbersDTO First { get; set; }
        public ComplexNumbersDTO Second { get; set; }
    }

}
