<?

function test08LeftPatternMiddleOfRightOneShouldSimplify() {
  $this->assertEquals(
      ['house'],
      (new LikePatternSimplifier())->simplify
      (['house', 'casahousecasa']));
}

function test09RightPatternMiddleOfLeftOneShouldSimplify() {
  $this->assertEquals(
      ['medio'],
      (new LikePatternSimplifier())->simplify(
          ['enmediodetodo', 'medio']));
}

function test10RightPatternMiddleOfLeftOneUnrelatedShouldSimplify() {
  $this->assertEquals(
      ['medio', 'nada'],
      (new LikePatternSimplifier())->simplify(
          ['enmediodetodo', 'medio', 'nada']));
}

// Test data were suggested by Spanish speaking QA Engineers