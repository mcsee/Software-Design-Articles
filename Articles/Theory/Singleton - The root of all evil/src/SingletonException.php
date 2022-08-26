<?

class Singleton {
    private function __construct() {
        throw new Exception('Cannot Create new instances');
    }
}