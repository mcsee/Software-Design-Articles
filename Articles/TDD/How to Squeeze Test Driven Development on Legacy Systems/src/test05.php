<?

function test05RightPatternIncludedInLeftOneShouldBeSimplified() {
    $this->assertEquals(
        ['Sigur'],
        (new LikePatternSimplifier())->simplify(
            ['Sigur Ros', 'Sigur']));
}