<?
use PHPUnit\Framework\TestCase; 
   
class LikePatternSimplifierTest1 extends TestCase {
   function test01NoPatternsShouldReturnEmpty() {
       $this->assertEquals(
           [],
           (new LikePatternSimplifier())->simplify([]));
   }
}