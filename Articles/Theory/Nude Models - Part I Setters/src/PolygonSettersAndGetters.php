<?

final class Polygon {
    private $vertices;
    
    public function getVertices(): Collection {
        return $this->vertices;
    }

    public function setVertices(Collection $newVertices) {
        $this->vertices = $newVertices;
    }
}