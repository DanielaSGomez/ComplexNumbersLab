using ComplexNumbers.Domain;

namespace ComplexNumbers.Application.Helpers
{
    public class ComplexHelpers
    {
        public static double ComplexModule(ComplexNumber z)
        {
            //hypot calculates the square root of the two numbers elevated to square
            return Double.Hypot(z.Real, z.Imaginary);
        }

        public static double ComplexArgument(ComplexNumber z)
        {
            //Atan2 dividez im/real, and takes care of all posible overflow or divide by zero cases
            return Math.Atan2(z.Imaginary, z.Real);
        }

        //polar form of a complex number: 𝑧 = 𝑟 (cos𝜃 + 𝑖sin𝜃), where r is the module of the number and 𝜃 is the argument
        //it is used to represent the number with their angles on the cartesian axis
        //return tuple
        public static (double r, double theta) ComplexToPolar(ComplexNumber z)
        {
            double r = ComplexModule(z);
            double theta = ComplexArgument(z);
            return (r, theta);
        }

        public static ComplexNumber PolarToCartesian(double r, double theta)
        {
            double real = r * Math.Cos(theta);
            double imaginary = r * Math.Sin(theta);

            return new ComplexNumber(real, imaginary);
        }


        public static ComplexNumber Conjugate(ComplexNumber z)
        {
            return new ComplexNumber(z.Real, -z.Imaginary);
        }

        //list of roots, n number of roots to find
        public static List<ComplexNumber> Roots(ComplexNumber z, int n)
        {
            var (r, theta) = ComplexToPolar(z);
            double rootR = Math.Pow(r, 1.0 / n);
            var results = new List<ComplexNumber>();

            for (int k = 0; k < n; k++)
            {
                double angle = (theta + 2 * Math.PI * k) / n;
                results.Add(PolarToCartesian(rootR, angle));
            }

            return results;
        }


    }
}
