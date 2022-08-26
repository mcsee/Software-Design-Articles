<?php

  private $winnerWord;
    function __construct(Dictionary $validWords, Word $winnerWord) {
        $this->dictionary = $validWords;
        $this->wordsTried = [];
        $this->winnerWord = $winnerWord;
    }

    function hasWon(): bool {
        return in_array($this->winnerWord, $this->wordsTried);
    }