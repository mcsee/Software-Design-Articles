<?

final class Star {
  
  private $distanceInParsecs;
  
  public function timeToReachLightToUs() {
    return $this->convertDistanceInParsecsToLightYears($this->distanceInParsecs);
  }
  
  private function convertDistanceInParsecsToLightYears($distanceInParsecs) {
      return 3.26 * $distanceInParsecs;
      // function is using an argument which is already available.
      // since it has private access to $distanceInParsecs
      // this is another smell indicator.

      // We cannot test this function since it is private
  }
}