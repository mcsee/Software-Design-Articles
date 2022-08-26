<?

private function addTerms(string $SQLSelect) {
    $selectSentence = $this->createSqlWhere();
    foreach ($this->texts() as $text) {
        $selectSentence->addWhere(
            $this->tableAlias() . " LIKE '%" . $this->sanitize($text) . "%'");
    }
    $SQLselect->addWhere($selectSentence->asSQLSentence());
}
