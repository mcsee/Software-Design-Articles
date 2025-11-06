<?

final class GeographicCoordinate{

    function __construct($latitude, $longitude) {
        if (!$this->isValidLatitude($latitude)) {
            throw new InvalidLatitudeException($latitude);
        }
        // ...
    }
}