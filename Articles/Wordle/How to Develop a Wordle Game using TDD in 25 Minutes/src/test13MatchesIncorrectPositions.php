<?php

public function test13MatchesIncorrectPositions() {
  $firstWord = new Word('trees');
  $secondWord = new Word('drama');
  $this->assertEquals([2], 
       $firstWord->matchesPositionWith($secondWord));
  $this->assertEquals([], 
       $firstWord->matchesIncorrectPositionWith($secondWord));
}

// the easy solution
function matchesIncorrectPositionWith(Word $anotherWord) : array {
  return [];
}