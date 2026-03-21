<?

final class Polygon {

  private $vertices;

  private function __construct(Collection $newVertices) {
    if (count($newVertices < 3)) {
       throw new 
         Exception(
           'Can\'t create a polygon with less than 3 vertices');
    }
    $this->vertices = $newVertices;
    }
}