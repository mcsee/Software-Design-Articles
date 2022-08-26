<?

function test13SamePatternsDifferentCaseDifferentOrderSimplifyToLowerCase() {
    $this->assertEquals(
        ['yes'],
        (new LikePatternSimplifier())->simplify(
            ['Yes', 'yes']));
}