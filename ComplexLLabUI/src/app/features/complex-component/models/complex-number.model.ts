export interface ComplexNumber
{
    real: number;
    imaginary: number;
}

export interface ComplexRequestDTO
{
    first : ComplexNumber;
    second : ComplexNumber;
}