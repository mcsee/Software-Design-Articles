<?

$triangle = 
    new Polygon([new Point(1, 1), new Point(2, 2), new Point(3, 3)]);
$lastPoint = $triangle->getVertices()->last();
foreach ($triangle->getVertices() as $vertex) {
    $canvas->drawLine($vertex, $lastPoint);
    $lastPoint = $vertex;
}