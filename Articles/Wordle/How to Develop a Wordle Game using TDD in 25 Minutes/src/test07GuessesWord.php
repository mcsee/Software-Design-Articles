<?php
  public function test07GuessesWord() {
        $words = [new Word('happy')];
        $dictionary = new Dictionary($words);
        $winnerWord = new Word('happy');
        $game = new Game($dictionary, $winnerWord);
        $this->assertFalse($game->hasWon());
        $game->addtry(new Word('happy'));
        $this->assertTrue($game->hasWon());
    }