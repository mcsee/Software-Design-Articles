<?php

final class Game {

    private $wordsTried;
    private $dictionary;
    function __construct(Dictionary $validWords) {
        $this->dictionary = $validWords;
        $this->wordsTried = [];
    }

    function addTry(Word $trial) {
        if (!$this->dictionary->includesWord($trial)) {
            throw new \Exception('Word is not included ' . $trial);
        }
        return $this->wordsTried[] = $trial;
    }
}