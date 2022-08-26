<?

private function alreadyIncludesPattern(array $patternsWithoutDuplicates, string $needlePattern): bool {
    foreach ($patternsWithoutDuplicates as $innerPattern) {
        if ($needlePattern != $innerPattern &&
            (stripos($needlePattern, $innerPattern) !== false)) {
            return false;
        }
    }
    return true;
}

function simplify(array $patterns): array {
    return array_values(array_filter($patterns,
        fn ($outerPattern) => $this->alreadyIncludesPattern($patterns, $outerPattern)));
}