<?

class Singleton {
    private function __construct() {
        throw new Exception('Can\'t create new instances');
    }
}