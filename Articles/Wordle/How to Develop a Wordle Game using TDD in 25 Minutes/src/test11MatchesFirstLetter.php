<?php
  public function test11MatchesFirstLetter() {
        $firstWord = new Word('trees');
        $secondWord = new Word('table');
        $this->assertEquals(
            [1],
            $firstWord->matchesPositionWith($secondWord));
    }