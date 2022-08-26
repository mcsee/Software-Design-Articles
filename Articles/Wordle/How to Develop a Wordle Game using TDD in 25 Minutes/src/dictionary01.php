<?php

Namespace Wordle;

final class Dictionary {

    function __construct(array $words) {
        $this->words = $words;
    }

    function wordsCount(): int {
        return 0;
    }
}
