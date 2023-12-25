<?

function test08LeftPatternMiddleOfRightOneShouldBeSimplified() {
    $this->assertEquals(
        ['house'],
        (new LikePatternSimplifier())->simplify
        (['house', 'casahousecasa']));
}

function test09RightPatternMiddleOfLeftOneShouldBeSimplified() {
    $this->assertEquals(
        ['medio'],
        (new LikePatternSimplifier())->simplify(
            ['enmediodetodo', 'medio']));
}

function test10RightPatternMiddleOfLeftOneUnrelatedShouldBeSimplified() {
    $this->assertEquals(
        ['medio', 'nada'],
        (new LikePatternSimplifier())->simplify(
            ['enmediodetodo', 'medio', 'nada']));
}

// Test data were suggested by Spanish speaking QA Engineers