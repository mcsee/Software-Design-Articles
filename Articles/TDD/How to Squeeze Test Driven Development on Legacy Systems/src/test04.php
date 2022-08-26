<?

  function test04LeftPatternIncludedInRightOneShouldBeSimplified() {
    $this->assertEquals(
        ['Sigur'],
        (new LikePatternSimplifier())->simplify(
            ['Sigur', 'Sigur Ros']));
  }