<?php

namespace Wordle;

use PHPUnit\Framework\TestCase;

final class WordTest extends TestCase {
    public function test01ValidWordLettersAreValid() {
        $wordleWord = new Word('valid');
        $this->assertEquals(['v', 'a', 'l', 'i', 'd'], $wordleWord->letters());
    }
}