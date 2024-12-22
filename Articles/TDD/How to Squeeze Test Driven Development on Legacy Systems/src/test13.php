<?

function 
    test13SamePatternsDifferentCaseDifferentOrderSimplifyLowerCase() {
    $this->assertEquals(
        ['yes'],
        (new LikePatternSimplifier())->simplify(
            ['Yes', 'yes']));
}