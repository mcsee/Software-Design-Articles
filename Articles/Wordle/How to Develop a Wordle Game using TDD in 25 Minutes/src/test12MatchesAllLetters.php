<?php

public function test12MatchesAllLetters() {
        $firstWord = new Word('trees');
        $secondWord = new Word('trees');
        $this->assertEquals([1, 2, 3 , 4 ,5], $firstWord->matchesPositionWith($secondWord));
    }