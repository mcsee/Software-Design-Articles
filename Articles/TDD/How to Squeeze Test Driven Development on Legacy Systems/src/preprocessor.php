<?

private function removeDuplicates(
  array $patternsWithPossibleDuplicates): array {
  return array_intersect_key(
      $patternsWithPossibleDuplicates,
      array_unique(
          array_map("strtolower", $patternsWithPossibleDuplicates)));
}

function simplify(array $patterns): array {
  $patternsWithoutDuplicates = $this->removeDuplicates($patterns);
  return array_values(array_filter($patternsWithoutDuplicates,
      fn ($outerPattern) => 
         $this->alreadyIncludesPattern(
             $patternsWithoutDuplicates, $outerPattern)));
}