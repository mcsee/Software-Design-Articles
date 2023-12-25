<?

function test14SamePatternsDifferentCaseWithExtraShouldSimplifyTwo() {
    $this->assertEquals(
        ['Yes', 'no'],
        (new LikePatternSimplifier())->simplify(
            ['Yes', 'yes', 'no']));
}

function test15TwoPairsOfPatternsDifferentCaseShouldSimplifyTwo() {
    $this->assertEquals(
        ['Yes', 'no'],
        (new LikePatternSimplifier())->simplify(
            ['Yes', 'yes', 'no', 'No']));
}

function test16TwoPairsOfPatternsDifferentCaseExtraShouldSimplifyThree() {
    $this->assertEquals(
        ['Yes', 'no', 'Sure'],
        (new LikePatternSimplifier())->simplify(
            ['Yes', 'yes', 'no', 'No', 'Sure']));
}

function test17TwoPairsOfPatternsDifferentCaseTrickyShouldSimplifyTwo() {
    $this->assertEquals(
        ['Yes', 'no'],
        (new LikePatternSimplifier())->simplify(
            ['Yes', 'yes', 'no', 'No', 'Not Sure']));
}
//’Not sure’ is a special case of ‘No’ which makes sense in a like pattern