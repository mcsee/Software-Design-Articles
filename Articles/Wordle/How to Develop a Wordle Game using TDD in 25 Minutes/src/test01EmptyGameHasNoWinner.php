<?php

final class GameTest extends TestCase {
    public function test01EmptyGameHasNoWinner() {
        $game = new Game();
        $this->assertFalse($game->hasWon());
    }
}