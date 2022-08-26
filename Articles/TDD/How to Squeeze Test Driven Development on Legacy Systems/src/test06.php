<?

function test06CapitalizationIsNotImportantWeMustSimplify() {
    $this->assertEquals(
        ['Sigur'],
        (new LikePatternSimplifier())->simplify(
            ['SIgur rOs', 'Sigur']));
}