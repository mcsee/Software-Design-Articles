<?

final class GeographicCoordinate {

    function __construct($latitude, $langitude) {
        if (!$this->isValidLatitude($latitude)) {
            throw new InvalidLatitudeException($latitude);
            // ...
            $this->longitude = $longitude;
            $this->latitude = $latitude;
        }
    }
}

$coordinate = new GeographicCoordinate(1000, 2000);
// trows an error since these values don't exist on Earth