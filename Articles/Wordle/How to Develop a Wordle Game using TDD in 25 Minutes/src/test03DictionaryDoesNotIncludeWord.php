<?php
public function test03DictionaryDoesNotIncludeWord() {
        $words = [new Word('happy')];
        $dictionary = new Dictionary($words);
        $this->assertFalse($dictionary->includesWord(new Word('sadly')));
    }

 
// the solution
function includesWord(): bool {
        return false;
    }
