using System;

namespace Example
{
  class Betelgeuse
  {
    static void Main(string[] args)
    {
      double starSize = 100.0;
      Console.WriteLine("star size: {0}", starSize);
      // star size: 100
      double supernovaSize = SimulateFinalSize(ref starSize);
      // Notice 'ref' modifier
      Console.WriteLine("supernova size: {0}", supernovaSize); 
      // supernova size: 10000
      Console.WriteLine("original star size after: {0}", starSize);
      // original star size after: 10000
      // WRONG: It should not be affected
    }

    public static double SimulateFinalSize(ref double size)
    {
      // Notice 'ref' modifier
      // Oversimplification
      // You should use Sedov-Taylor solution
      size = size * 100;
      return size;
    }
  }
}