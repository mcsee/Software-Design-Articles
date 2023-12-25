<?

function simplify(array $patterns): array {
    return array_values(array_filter($patterns,
        function ($outerPattern) use ($patterns) {
        foreach ($patterns as $innerPattern) {
            if ($outerPattern != $innerPattern &&
                substr_compare(
                    $outerPattern,
                    $innerPattern,
                    0,
                    strlen($innerPattern),
                    true)
                  === 0) {
                return false;
            }
        }
        return true;
    }));
}