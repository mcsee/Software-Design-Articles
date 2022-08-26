<?

final class GeographicCoordinate{

    function __construct($latitude, $langitude) {
        if (!$this->isValidLatitude($latitude)) {
            throw new InvalidLatitudeException($latitude);
        }
        // ...
    }
}