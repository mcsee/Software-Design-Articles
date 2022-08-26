<?php

public function test09LettersForGrassWord() {
        $grassWord = new Word('grass');
        $this->assertEquals(['g', 'r', 'a', 's', 's'], $grassWord->letters());
    }