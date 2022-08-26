<?php
  public function test05TryFiveWordsLoses() {
        $game = new Game();
        $game->addtry(new Word('loser'));
        $game->addtry(new Word('loser'));
        $game->addtry(new Word('loser'));
        $game->addtry(new Word('loser'));
        $this->assertFalse($game->hasLost());
        $game->addtry(new Word('loser'));
        $this->assertTrue($game->hasLost());
    }
'''

// The code
function hasLost(): bool {
        return count($this->wordsTried) > 4;
    }
