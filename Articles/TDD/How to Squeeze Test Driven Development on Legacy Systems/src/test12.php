<?

function test12SamePatternsDifferentCaseShouldYieldJustOneTermInLowercase() {
    $this->assertEquals(
        ['yes'],
        (new LikePatternSimplifier())->simplify(
            ['yes', 'Yes']));
}