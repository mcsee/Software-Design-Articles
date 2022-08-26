<?php

public function test04TryOneWordAndDontLooseYet() {
        $game = new Game();
        $game->addtry(new Word('loser'));
        $this->assertFalse($game->hasLost());
    }

// the solution
 function hasLost(): bool {
        return false;
    }

