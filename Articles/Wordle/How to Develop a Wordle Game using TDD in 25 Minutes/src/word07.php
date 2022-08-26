<?php

final class Word {

    private $letters;
    function __construct(string $letters) {
        if (!\preg_match('/^[a-z]+$/i', $letters)) {
            throw new \Exception('word contain invalid letters');
        }
        if (strlen($letters) < 5) {
            throw new \Exception('Too few letters. Should be 5');
        }
        if (strlen($letters) > 5) {
            throw new \Exception('Too many letters. Should be 5');
        }
        $this->letters = $letters;
    }

    function letters(): array {
        return ['v', 'a', 'l', 'i', 'd'];
    }
}