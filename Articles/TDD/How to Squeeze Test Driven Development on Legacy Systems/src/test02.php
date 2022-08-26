<?

function test02SinglePatternDoesNotSimplify() {
    $this->assertEquals(
        ['Arcade Fire'],
        (new LikePatternSimplifier())->simplify(['Arcade Fire']));
}