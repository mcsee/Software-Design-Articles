<?php

public function test03TryOneWordAndRecordIt() {
        $game = new Game();
        $game->addtry(new Word('loser'));
        $this->assertEquals([new Word('loser')], $game->wordsTried());
    }

// The solution

final class Game {

    private $wordsTried;
    function __construct() {
        $this->wordsTried = [];
    }

    function addTry(Word $trial) {
        return $this->wordsTried[] = $trial;
    }

    function wordsTried(): array {
        return $this->wordsTried;
    }
}