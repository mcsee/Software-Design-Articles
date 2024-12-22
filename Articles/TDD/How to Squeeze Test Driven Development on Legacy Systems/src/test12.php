<?

function 
    test12SamePatternsDifferentCaseShouldYieldJustOneTermLowercase() {
    $this->assertEquals(
        ['yes'],
        (new LikePatternSimplifier())->simplify(
            ['yes', 'Yes']));
}