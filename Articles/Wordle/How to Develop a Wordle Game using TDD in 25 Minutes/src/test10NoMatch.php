<?php
public function test10NoMatch() {
        $firstWord = new Word('trees');
        $secondWord = new Word('valid');
        $this->assertEquals(
                [],
                $firstWord->matchesPositionWith($secondWord));
    }


// This method in Word class

 function matchesPositionWith(Word $anotherWord) : array {
        return [];
    }