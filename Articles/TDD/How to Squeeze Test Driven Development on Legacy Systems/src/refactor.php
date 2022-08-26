<?

private function alreadyIncludesPattern(array $patterns, string $needlePattern): bool {
    foreach ($patterns as $innerPattern) {
        if ($needlePattern != $innerPattern &&
            substr_compare($needlePattern, $innerPattern, 0, strlen($innerPattern), true) === 0) {
            return false;
        }
    }
    return true;
}

function simplify(array $patterns): array {
    return array_values(array_filter($patterns,
        fn ($outerPattern) => $this->alreadyIncludesPattern($patterns, $outerPattern)));
}