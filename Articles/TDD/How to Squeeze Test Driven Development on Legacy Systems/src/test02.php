<?

function test02SinglePatternDoesntSimplify() {
    $this->assertEquals(
        ['Arcade Fire'],
        (new LikePatternSimplifier())->simplify(['Arcade Fire']));
}