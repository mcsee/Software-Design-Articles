<?

final class Point {
    private $angle;
    private $distance;

    public function x() {
        return $this->distance * cos($this->angle);
    }

    public function y() {
        return $this->distance * sin($this->angle);
    }
}