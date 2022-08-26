<?

private function addTerms(string $SQLselect) {
    $selectSentence = $this->createSqlWhere();
    // INJECTED CODE
    $simplifiedTerms = (new LikePatternSimplifier())->simplify($this->texts());
    // INJECTED CODE
    foreach ($simplifiedTerms as $text) {
        $selectSentence->addWhere(
            $this->tableAlias() . " LIKE '%" . $this->sanitize($text) . "%'");
    }
    $SQLselect->addWhere($selectSentence->asSQLSentence());
}
