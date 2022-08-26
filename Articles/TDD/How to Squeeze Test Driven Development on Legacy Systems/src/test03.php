<?
   function test03TwoUnrelatedPatternsDontSimplify() {
      $this->assertEquals(
          ['Arcade Fire' , 'Radiohead.'],
          (new LikePatternSimplifier())->simplify(
              ['Arcade Fire' , 'Radiohead.']));
   }