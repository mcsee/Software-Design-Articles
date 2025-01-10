using System;

namespace Example
{
  class Betelgeuse
  {
    static void Main(string[] args)
    {
      const double starSize = 100.0; 
      // The const modifier warns the compiler
      Console.WriteLine("star size: {0}", starSize);
      // star size: 100
      double supernovaSize = SimulateFinalSize(starSize);
      // Notice 'ref' is omitted
      Console.WriteLine("supernova size: {0}", supernovaSize);
      // supernova size: 10000
      Console.WriteLine("original star size after: {0}", starSize);
      // original star size after: 100
      // It remains at the original value
    }

    public static double SimulateFinalSize(double size)
    {
      // Notice 'ref' is omitted
      // Oversimplification
      // You should use Sedov-Taylor solution
      size = size * 100;
      return size;
    }
  }
}
