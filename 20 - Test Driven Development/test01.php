use PHPUnit\Framework\TestCase; 
   
class LikePatternSimplifierTest extends TestCase {
   function test01NoPatterns() {
       $this->assertEquals([], (new LikePatternSimplifier())->simplify([]));
   }
}
